import { TEXT_SCENE_NAME } from '@/general'
import { Bot } from '@/types'

export const registerHandlers = (bot: Bot) => {
  bot.start(ctx => {
    ctx.scene.enter(TEXT_SCENE_NAME)
  })

  bot.action(/^cb-/, ctx => {
    ctx.answerCbQuery('Данная кнопка потеряла актуальность', {
      ['show_alert']: true,
    })
  })
}
