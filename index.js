TELEGRAM_BOT_TOKEN = '';
const TeleBot = require('telebot');
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const chatIds = [];
const CronJob = require('cron').CronJob;
const job = new CronJob(
    '0/5 * * * * *',
    function() {
        console.log('You will see this message every 5 second');
        chatIds.forEach((chatId) => {
    bot.sendMessage(chatId, 'Salom. Botga hush kelibsiz');
        });
    },
    null,
    true);
;

bot.on('text', (msg) => msg.reply.text('Kelgan habar: ' + msg.text));

bot.start();

bot.on(['/start'] , (msg) => {
    let chatId = msg.chat.id;
    if(!chatIds.includes(chatId)) {
        chatIds.push(chatId);
        msg.reply.text('Boshladik!');
        job.start()
    }
});
bot.on(['/stop'] , (msg) => {
        let chatId = msg.chat.id;
        chatIds.pop(chatId);
    });
bot.start();