const AC_GAME_OBJECTS = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    start() { // 只执行一次
        
    }

    update() { // 每一帧执行一次，除了第一帧

    }

    on_destory() { // 删除前执行

    }

    destory() {
        this.on_destory();
        for (let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i];
            if (obj === this) {
                AC_GAME_OBJECTS.slice(i);
                break;
            }
        }
    }
}

let last_timestamp;
const step = timestamp => {
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp; // timedelta：两帧时间间隔
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step)
}

requestAnimationFrame(step)