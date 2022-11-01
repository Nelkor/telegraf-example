import { Telegraf, Scenes } from 'telegraf'
import mongoose from 'mongoose'
import { session } from 'telegraf-session-mongoose'
import { config } from 'dotenv'

import { registerHandlers } from '@/handlers'
import { BotContext } from '@/types'

import { sumScene } from './scenes/sum-scene'
import { textScene } from './scenes/text-scene'

config()

const initBot = () => {
  if (!process.env.TELEGRAM_TOKEN) {
    throw new Error('Create .env file before launching')
  }

  const bot = new Telegraf<BotContext>(process.env.TELEGRAM_TOKEN)

  const stage = new Scenes.Stage([
    sumScene,
    textScene,
  ] as unknown as Scenes.BaseScene<Scenes.SceneContext>[])

  bot.use(session())
  bot.use(stage.middleware())

  registerHandlers(bot)

  bot.launch().then(() => {
    console.log('The bot is working...')

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
  })
}

const mongoUri = [
  'mongodb://',
  `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}`,
  '@localhost:',
  process.env.MONGO_PORT,
].join('')

mongoose.connect(mongoUri).then(initBot)
