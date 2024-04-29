const { Telegraf } = require('telegraf');
const axios = require('axios');


const token = '6694957050:AAEzjzL54dmhphDtmSLDBeP8qx3HExRQ39Y'; // your telegram bot token

const bot = new Telegraf(token);

bot.start(async (ctx) => {
    const chatId = ctx.chat.id;
    const msg_id = ctx.message.message_id;
    await ctx.reply('تستی', {
        reply_to_message_id: msg_id
    });
});

bot.on('text', async (ctx) => {
    if (ctx.chat.type === 'private') {
        const chatId = ctx.chat.id;
        const userText = ctx.message.text;
        const msg_id = ctx.message.message_id;

        const please = await ctx.reply('لطفا کمی صبر کنید...', {
            reply_to_message_id: msg_id
        });

        try {
            const response = await axios.get(`https://chat-gpt-ehsan.liara.run?text=${userText}`)

            if (response.status === 200) {
                const replyText = response.data.Results.answer;
                await ctx.telegram.editMessageText(chatId, please.message_id, null, replyText, {
                    parse_mode: 'Markdown'
                });
            } else {
                throw new Error('متاسفانه خطایی رخ داده است.');
            }
        } catch (error) {
            await ctx.telegram.editMessageText(chatId, please.message_id, null, 'متاسفانه خطایی رخ داده است.');
        }
    } else if (ctx.chat.type !== 'private' && ctx.message.text.startsWith('gpt:') || ctx.message.text.startsWith('.gpt')) {
        const chatId = ctx.chat.id;
        const userText = ctx.message.text.replace(/^gpt:|^\.gpt/, '').trim();
        const msg_id = ctx.message.message_id;

        const please = await ctx.reply('لطفا کمی صبر کنید...', {
            reply_to_message_id: msg_id
        });

        try {
            const response = await axios.get(`https://chat-gpt-ehsan.liara.run?text=${userText}`)

            if (response.status === 200) {
                const replyText = response.data.Results.answer;
                await ctx.telegram.editMessageText(chatId, please.message_id, null, replyText, {
                    parse_mode: 'Markdown'
                });
            } else {
                throw new Error('متاسفانه خطایی رخ داده است.');
            }
        } catch (error) {
            await ctx.telegram.editMessageText(chatId, please.message_id, null, 'متاسفانه خطایی رخ داده است.');
        }
    }
});

bot.launch();