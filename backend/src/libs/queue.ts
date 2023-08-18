import { redisConfig } from '@/config';
import * as jobs from '../jobs';
import Queue from 'bull';
import chalk from 'chalk';
import { logger } from '@/utils/logger';

const queues = Object.values(jobs).map(job => {
  const queueName = job.key;

  console.log(chalk.gray(`Creating queue ${queueName}...`));

  return {
    bull: new Queue(queueName, { redis: redisConfig }),
    name: job.key,
    handle: job.handle,
    options: job.options,
  };
});

export default {
  queues,
  add(queueName, data) {
    const queue = this.queues.find(queue => queue.name === queueName);

    if (queue) {
      return queue.bull.add(data, queue.options);
    }

    return false;
  },
  process() {
    return this.queues.forEach(queue => {
      console.log(chalk.gray(`Processing queue ${queue.name}...`));

      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        logger.error(`Job ${queue.name} failed`, err);
      });
    });
  },
  pause() {
    return this.queues.forEach(queue => {
      console.log(chalk.gray(`Pausing queue ${queue.name}...`));
      queue.bull.pause();
    });
  },
  resumeAll() {
    return this.queues.forEach(queue => {
      console.log(chalk.gray(`Resuming queue ${queue.name}...`));

      queue.bull.resume();
    });
  },
  resume(name: string) {
    const queue = this.queues.find(queue => queue.name === name);

    if (queue) {
      queue.bull.resume();
    }
  },
  async isPaused(name: string) {
    const queue = this.queues.find(queue => queue.name === name);

    if (queue) {
      const isPaused = await queue.bull.isPaused();
      return isPaused;
    }

    throw new Error(`Fila ${name} não existe!`);
  },
  async count(name: string): Promise<number> {
    const queue = this.queues.find(queue => {
      return queue.name === name;
    });

    if (queue) {
      const count = await queue.bull.count();
      console.log(chalk.gray(`Queue ${name} has ${count} jobs...`));
      return count;
    }

    throw new Error(`Fila ${name} não existe!`);
  },
  async clean(name: string): Promise<boolean> {
    const queue = this.queues.find(queue => {
      return queue.name === name;
    });

    if (queue) {
      const numberReturn = await queue.bull.clean(1000, 'paused');
      console.log(chalk.gray(`Cleaning queue ${queue.name}: ${numberReturn} items cleaned.`));

      return true;
    }

    throw new Error(`Fila ${name} não existe!`);
  },
};
