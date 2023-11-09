export default class MathUtil {

    /**
    * 获取一个 min 到 max 范围内的随机整数
    * @param min 最小值
    * @param max 最大值
    */
    public static getRandomInt(min: number = 0, max: number = 1): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

}
