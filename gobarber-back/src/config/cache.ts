import { RedisOptions } from "ioredis";

interface ICacheConfig {
  driver: "redis";

  config: {
    redis: RedisOptions;
  };
}

export default {
  drive: "redis",

  config: {
    redis: {
      host: "localhost",
      port: 6379,
      password: undefined,
    },
  },
} as ICacheConfig;
