const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

// ==========================================================
// 🛑 แก้ไขข้อมูลในเครื่องหมาย ' ' ให้เป็นเลขของคุณเอง 🛑
// ==========================================================
// 🛑 แก้ไขข้อมูลในเครื่องหมาย ' ' ให้เป็นเลขของคุณเอง 🛑
const BOT_TOKEN = process.env.BOT_TOKEN; 
const GUILD_ID = '758711337064595536';
const VOICE_CHANNEL_ID = '941340905741353000';
// ==========================================================
// ==========================================================

function connectToVoice() {
    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) return console.log("หาเซิร์ฟเวอร์ไม่เจอ!");

    const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);
    if (!channel) return console.log("หาห้องเสียงไม่เจอ!");

    console.log(`กำลังส่ง ยามเหงา เข้าไปที่ห้อง: ${channel.name}`);

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfMute: false, 
        selfDeaf: true   
    });

    // ถ้าบอทหลุด ให้เชื่อมต่อใหม่เองอัตโนมัติ
    connection.on(VoiceConnectionStatus.Disconnected, () => {
        console.log("ยามเหงา หลุดจากห้องเสียง! กำลังพยายามกลับเข้าห้องใน 5 วินาที...");
        setTimeout(() => connectToVoice(), 5000);
    });
}

client.once('ready', () => {
    console.log(`บอทแสตนบายพร้อมใช้งานในชื่อ: ${client.user.tag}`);
    connectToVoice(); 
});

client.login(BOT_TOKEN);