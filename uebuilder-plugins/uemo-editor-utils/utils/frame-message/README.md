# Frame Message 通信系统

一个功能完备的跨 iframe 通信解决方案，提供类似 TCP 的可靠连接机制和回调支持。

## ✨ 特性

- 🔄 **类 TCP 三次握手连接机制** - 确保连接的可靠性
- 🚪 **四次挥手断开连接** - 优雅的连接终止
- 💬 **消息回调支持** - 支持请求-响应模式
- ⏰ **超时处理** - 自动处理消息和回调超时
- 🔁 **重试机制** - 自动重试失败的连接和消息
- 💓 **心跳检测** - 保持连接活跃状态
- 🎯 **类型安全** - 完整的 TypeScript 类型支持
- 🔧 **事件驱动** - 基于 mitt 的事件系统
- 🏗️ **单例模式** - 支持全局唯一实例管理

## 📦 安装

```bash
npm install @stone/uemo-editor-utils
```

## 🚀 快速开始

### 服务端（父窗口）

```typescript
import { FrameMessageBus } from "@stone/uemo-editor-utils/utils/frame-message";

// 创建服务端实例
const bus = FrameMessageBus.getInstance("parent-window");

// 监听连接事件
bus.eventBus.on("connected", (message) => {
    console.log(`客户端已连接: ${message.from}`);
});

// 监听消息事件
bus.eventBus.on("message", (message) => {
    if (message.reply) {
        // 处理需要回复的消息
        const { action, data } = message.payload.data;
        if (action === "getUserInfo") {
            message.reply({ id: data.userId, name: "张三" });
        }
    }
});
```

### 客户端（子窗口）

```typescript
import { FrameMessageClient } from "@stone/uemo-editor-utils/utils/frame-message";

// 创建客户端实例
const client = FrameMessageClient.getInstance("child-window");

// 连接到服务端
await client.connect("parent-window");

// 发送带回调的消息
client.sendMessage("parent-window", { action: "getUserInfo", userId: "123" }, (response) => {
    console.log("用户信息:", response);
});

// 发送普通消息
client.sendMessage("parent-window", { action: "notify", message: "hello" });
```

## 📚 API 文档

### FrameMessageBus（服务端）

#### 创建实例

```typescript
// 单例模式
const bus = FrameMessageBus.getInstance(name: string);

// 普通实例
const bus = new FrameMessageBus(name: string);
```

#### 方法

| 方法             | 描述         | 参数                                  | 返回值                |
| ---------------- | ------------ | ------------------------------------- | --------------------- |
| `sendMessage`    | 发送消息     | `(target, data, callback?, options?)` | `string \| undefined` |
| `cancelCallback` | 取消回调     | `(callbackId, target?)`               | `void`                |
| `disconnect`     | 断开所有连接 | -                                     | `void`                |

#### 事件

| 事件           | 描述       | 参数                                   |
| -------------- | ---------- | -------------------------------------- |
| `connected`    | 客户端连接 | `IFrameMessage`                        |
| `disconnected` | 客户端断开 | `IFrameMessage`                        |
| `message`      | 收到消息   | `IFrameMessage & { reply?: Function }` |
| `error`        | 发生错误   | `IFrameMessage`                        |

### FrameMessageClient（客户端）

#### 创建实例

```typescript
// 单例模式
const client = FrameMessageClient.getInstance(name: string);

// 普通实例
const client = new FrameMessageClient(name: string);
```

#### 方法

| 方法             | 描述         | 参数                                  | 返回值                |
| ---------------- | ------------ | ------------------------------------- | --------------------- |
| `connect`        | 连接到服务端 | `(target?)`                           | `Promise<boolean>`    |
| `sendMessage`    | 发送消息     | `(target, data, callback?, options?)` | `string \| undefined` |
| `cancelCallback` | 取消回调     | `(callbackId, target?)`               | `void`                |
| `disconnect`     | 断开连接     | -                                     | `void`                |

#### 事件

与 `FrameMessageBus` 相同的事件接口。

## 🔧 配置选项

### 回调选项 (ICallbackOptions)

```typescript
interface ICallbackOptions {
    once?: boolean; // 是否一次性回调，默认 true
    timeout?: number; // 超时时间（毫秒），默认 10000
    onTimeout?: () => void; // 超时回调
    onError?: (error: Error) => void; // 错误回调
}
```

### 全局常量

```typescript
const VERSION = "1.0.0"; // 协议版本
const RETRY_INTERVAL = 1000; // 重试间隔（毫秒）
const MAX_RETRY_COUNT = 3; // 最大重试次数
const MESSAGE_TIMEOUT = 5000; // 消息超时时间（毫秒）
const CALLBACK_TIMEOUT = 10000; // 回调超时时间（毫秒）
const HEARTBEAT_INTERVAL = 30000; // 心跳间隔（毫秒）
```

## 📋 完整示例

### 父窗口实现

```typescript
import { FrameMessageBus } from "@stone/uemo-editor-utils/utils/frame-message";

class ParentWindow {
    private bus = FrameMessageBus.getInstance("parent-window");

    constructor() {
        this.setupEventListeners();
    }

    private setupEventListeners() {
        // 监听连接事件
        this.bus.eventBus.on("connected", (message) => {
            console.log(`✅ 子窗口已连接: ${message.from}`);
            this.onClientConnected(message.from);
        });

        // 监听消息事件
        this.bus.eventBus.on("message", (message: any) => {
            if (message.payload?.callbackId && message.reply) {
                this.handleCallbackMessage(message);
            } else {
                console.log("📨 收到普通消息:", message.payload?.data);
            }
        });

        // 监听错误事件
        this.bus.eventBus.on("error", (message: any) => {
            console.error("❌ 发生错误:", message.payload);
        });
    }

    private handleCallbackMessage(message: any) {
        const { data } = message.payload || {};

        switch (data?.action) {
            case "getUserInfo":
                this.handleGetUserInfo(data, message.reply);
                break;
            case "saveUserData":
                this.handleSaveUserData(data, message.reply);
                break;
            default:
                console.log("📨 未知消息:", data);
        }
    }

    private onClientConnected(clientName: string) {
        // 发送欢迎消息
        this.bus.sendMessage(
            clientName,
            {
                action: "welcome",
                message: "欢迎连接到父窗口！",
                timestamp: Date.now(),
            },
            (response: any) => {
                console.log("👋 收到欢迎回复:", response);
            }
        );
    }

    private handleGetUserInfo(request: any, reply: Function) {
        // 模拟异步获取用户信息
        setTimeout(() => {
            reply({
                id: request.userId,
                name: "张三",
                email: "zhangsan@example.com",
                avatar: "https://example.com/avatar.jpg",
            });
        }, 1000);
    }

    private handleSaveUserData(request: any, reply: Function) {
        // 模拟保存数据
        setTimeout(() => {
            reply({
                success: true,
                savedAt: Date.now(),
            });
        }, 500);
    }
}

// 创建父窗口实例
new ParentWindow();
```

### 子窗口实现

```typescript
import { FrameMessageClient } from "@stone/uemo-editor-utils/utils/frame-message";

class ChildWindow {
    private client = FrameMessageClient.getInstance("child-window");
    private connected = false;

    constructor() {
        this.setupEventListeners();
    }

    private setupEventListeners() {
        // 监听连接事件
        this.client.eventBus.on("connected", () => {
            console.log("✅ 已连接到服务器");
            this.connected = true;
        });

        // 监听断开连接事件
        this.client.eventBus.on("disconnected", () => {
            console.log("❌ 与服务器断开连接");
            this.connected = false;
        });

        // 监听消息事件
        this.client.eventBus.on("message", (message: any) => {
            if (message.payload?.callbackId && message.reply) {
                this.handleCallbackMessage(message);
            } else {
                console.log("📨 收到普通消息:", message.payload?.data);
            }
        });
    }

    private handleCallbackMessage(message: any) {
        const { data } = message.payload || {};

        switch (data?.action) {
            case "welcome":
                this.handleWelcomeMessage(data, message.reply);
                break;
            case "notification":
                this.handleNotification(data, message.reply);
                break;
        }
    }

    private handleWelcomeMessage(data: any, reply: Function) {
        console.log("👋 收到欢迎消息:", data.message);
        reply({
            received: true,
            message: "谢谢！我已经收到欢迎消息。",
        });
    }

    private handleNotification(data: any, reply: Function) {
        console.log("📢 收到通知:", data);
        reply({ received: true });
    }

    public async connect(target = "parent-window"): Promise<boolean> {
        try {
            const result = await this.client.connect(target);
            console.log("🎉 连接成功！");
            return result;
        } catch (error) {
            console.error("❌ 连接失败:", error);
            return false;
        }
    }

    public async getUserInfo(userId: string): Promise<any> {
        if (!this.connected) {
            console.error("❌ 未连接到服务器");
            return null;
        }

        return new Promise((resolve) => {
            this.client.sendMessage(
                "parent-window",
                { action: "getUserInfo", userId },
                (response: any) => {
                    console.log("👤 用户信息:", response);
                    resolve(response);
                },
                { timeout: 5000 }
            );
        });
    }

    public async saveUserData(userId: string, data: Record<string, unknown>): Promise<any> {
        if (!this.connected) {
            console.error("❌ 未连接到服务器");
            return null;
        }

        return new Promise((resolve) => {
            this.client.sendMessage(
                "parent-window",
                { action: "saveUserData", userId, data },
                (response: any) => {
                    console.log("💾 保存结果:", response);
                    resolve(response);
                },
                { timeout: 10000 }
            );
        });
    }
}

// 使用示例
async function example() {
    const childWindow = new ChildWindow();

    try {
        // 连接到父窗口
        await childWindow.connect("parent-window");

        // 获取用户信息
        const userInfo = await childWindow.getUserInfo("user123");
        console.log("获取到用户信息:", userInfo);

        // 保存用户数据
        const saveResult = await childWindow.saveUserData("user123", {
            preferences: { theme: "dark" },
            lastLoginTime: Date.now(),
        });
        console.log("保存结果:", saveResult);
    } catch (error) {
        console.error("示例运行出错:", error);
    }
}

export { ChildWindow, example };
```

## 🔍 类型定义

### 核心接口

```typescript
// 消息接口
interface IFrameMessage<T extends CommandType = CommandType> {
    id: string; // 消息唯一ID
    from: string; // 发送方名称
    to: string; // 接收方名称
    command: T; // 命令类型
    state: ConnectionState; // 连接状态
    version: string; // 协议版本
    timestamp: number; // 时间戳
    payload?: ICommandPayload[T]; // 消息负载
}

// 命令类型枚举
enum CommandType {
    REGISTER = "REGISTER", // 注册连接
    REGISTER_ACK = "REGISTER_ACK", // 注册确认
    REGISTER_COMPLETE = "REGISTER_COMPLETE", // 注册完成
    MESSAGE = "MESSAGE", // 普通消息
    CALLBACK_RESPONSE = "CALLBACK_RESPONSE", // 回调响应
    CALLBACK_CANCEL = "CALLBACK_CANCEL", // 取消回调
    HEARTBEAT = "HEARTBEAT", // 心跳
    DISCONNECT = "DISCONNECT", // 断开连接请求
    DISCONNECT_ACK = "DISCONNECT_ACK", // 断开连接确认
    DISCONNECT_COMPLETE = "DISCONNECT_COMPLETE", // 断开连接完成
    ERROR = "ERROR", // 错误消息
}

// 连接状态枚举
enum ConnectionState {
    INITIAL = "INITIAL", // 初始状态
    SYN_SENT = "SYN_SENT", // 已发送连接请求
    SYN_ACK_RECEIVED = "SYN_ACK_RECEIVED", // 已收到连接确认
    ESTABLISHED = "ESTABLISHED", // 连接已建立
    FIN_WAIT_1 = "FIN_WAIT_1", // 等待断开确认
    FIN_WAIT_2 = "FIN_WAIT_2", // 等待对方断开
    CLOSE_WAIT = "CLOSE_WAIT", // 等待关闭
    LAST_ACK = "LAST_ACK", // 最后确认
    CLOSED = "CLOSED", // 已关闭
}
```

## 🛠️ 高级用法

### 持久性回调

```typescript
// 订阅状态更新（持续监听）
const callbackId = client.sendMessage(
    "parent-window",
    { action: "subscribeStatus" },
    (statusUpdate: any) => {
        console.log("📊 状态更新:", statusUpdate);
    },
    {
        once: false, // 持续监听
        timeout: 0, // 不超时
    }
);

// 取消订阅
client.cancelCallback(callbackId, "parent-window");
```

### 类型安全的消息发送

```typescript
// 定义消息类型
interface UserInfoRequest {
    action: "getUserInfo";
    userId: string;
}

interface UserInfoResponse {
    id: string;
    name: string;
    email: string;
}

// 类型安全的发送函数
function sendTypedMessage<TRequest, TResponse>(
    client: FrameMessageClient,
    target: string,
    request: TRequest,
    timeout = 5000
): Promise<TResponse> {
    return new Promise((resolve, reject) => {
        client.sendMessage(
            target,
            request,
            (response: TResponse) => {
                resolve(response);
            },
            {
                timeout,
                onTimeout: () => reject(new Error("Request timeout")),
                onError: (error) => reject(error),
            }
        );
    });
}

// 使用
const userInfo = await sendTypedMessage<UserInfoRequest, UserInfoResponse>(client, "parent-window", {
    action: "getUserInfo",
    userId: "123",
});
```

### 错误处理

```typescript
// 监听错误事件
client.eventBus.on("error", (errorMessage) => {
    const { type, message } = errorMessage.payload;

    switch (type) {
        case ErrorType.TIMEOUT:
            console.error("⏰ 超时错误:", message);
            break;
        case ErrorType.CONNECTION_FAILED:
            console.error("🔌 连接失败:", message);
            break;
        case ErrorType.SEND_FAILED:
            console.error("📤 发送失败:", message);
            break;
        default:
            console.error("❌ 未知错误:", message);
    }
});
```

## 🤝 最佳实践

1.  **使用单例模式**：避免重复创建实例
2.  **及时清理回调**：避免内存泄漏
3.  **设置合适的超时时间**：根据业务需求调整
4.  **处理连接状态**：检查连接状态后再发送消息
5.  **类型安全**：使用 TypeScript 类型定义
6.  **错误处理**：监听错误事件并适当处理

## 📄 许可证

MIT License

## 🔗 相关链接

- [mitt - 事件库](https://github.com/developit/mitt)
- [guid - 唯一 ID 生成](https://github.com/your-guid-lib)

---

_Frame Message 通信系统 - 让跨 iframe 通信变得简单可靠_ 🚀
