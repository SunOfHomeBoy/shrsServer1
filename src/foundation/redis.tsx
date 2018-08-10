// Copyright 2017 The HongJiang Project Authors. All right reserved. Use of this
// source that is governed by a Apache-style license that can be found in the
// LICENSE file.
//
// 定义Redis缓存数据库的常用操作
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as ioredis from 'ioredis'
import connect from '../config/redis'

export default class redis {
        private static cluster: ioredis.Redis = null

        private static instance(): ioredis.Redis {
                if (!redis.cluster) {
                        redis.cluster = new ioredis({ host: connect.host, port: connect.port, db: connect.data })
                }

                return redis.cluster
        }

        private static async command<T>(shell: string, fn: (callback: any) => T, ...args: any[]): Promise<T> {
                return new Promise<T>(resolve => {
                        let cluster: any = redis.instance()
                        cluster[shell](...args).then((callback: any) => {
                                resolve(fn(callback))
                        })
                })
        }

        // 设置给定 key 的过期时间
        public static async expire(key: string, seconds: number): Promise<boolean> {
                return redis.command<boolean>('expire', (callback: any) => callback === 1, key, seconds)
        }

        // 获取 key 相关联的字符串值
        public static async get(key: string): Promise<string> {
                return redis.command<string>('get', (callback: any) => callback || '', key)
        }

        // 设置字符串值 member 关联到 key
        public static async set(key: string, member: string): Promise<boolean> {
                return redis.command<boolean>('set', (callback: any) => callback === 'OK', key, member)
        }

        // 获取 key 相关联的字节数组值
        public static async getBuffer(key: string): Promise<Buffer> {
                return redis.command<Buffer>('getBuffer', (callback: any) => callback || new Buffer(''), key)
        }

        // 设置字节数组值 member 关联到 key
        public static async setBuffer(key: string, member: Buffer): Promise<boolean> {
                return redis.command<boolean>('set', (callback: any) => callback === 'OK', key, member)
        }

        // 获取 key 相关联的哈希表值
        public static async getHash(key: string): Promise<object> {
                return redis.command<object>('hgetall', (callback: any) => callback || {}, key)
        }

        // 设置哈希表值  member 关联到 key
        public static async setHash(key: string, member: object): Promise<boolean> {
                return redis.command<boolean>('hmset', (callback: any) => callback === 'OK', key, member)
        }

        // 移除并返回列表 key 的头元素 或者 尾元素
        public static async popList(key: string, first: boolean): Promise<any> {
                return redis.command<any>(first
                        ? 'lpop'
                        : 'rpop', (callback: any) => callback, key)
        }

        // 将一个或多个值 member 插入到列表 key 的表头部
        public static async pushList(key: string, ...member: any[]): Promise<number> {
                return redis.command<number>('lpush', (callback: any) => callback || 0, key, ...member)
        }

        // 将一个或多个 member 元素加入到集合 key
        public static async addSet(key: string, ...member: any[]): Promise<number> {
                return redis.command<number>('sadd', (callback: any) => callback || 0, key, ...member)
        }

        // 移除集合 key 中的一个或多个 member 元素
        public static async remSet(key: string, ...member: any[]): Promise<number> {
                return redis.command<number>('srem', (callback: any) => callback || 0, key, ...member)
        }

        // 获取集合 key 的所有元素
        public static async getSet(key: string): Promise<any[]> {
                return redis.command<any[]>('smembers', (callback: any) => callback || [], key)
        }

        // 删除给定的一个或多个 key
        public static async delKeys(...keys: string[]): Promise<number> {
                return redis.command<number>('del', (callback: any) => callback || 0, ...keys)
        }
}
