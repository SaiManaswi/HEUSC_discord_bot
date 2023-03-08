require('dotenv').config({path:__dirname+'/../.env'});
const fs = require('fs')
const ytdl = require('ytdl-core')
const {Client, Intents, Message}=require('discord.js')
const {createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel, StreamType}=require('@discordjs/voice');
const { format, join } = require('path');
const intents = new Intents(32767)
const client = new Client({intents : intents})
const player = createAudioPlayer();

client.login(process.env.TOKEN);

client.on('ready',()=>{
    console.log(client.user.tag)
})
client.on('messageCreate',message=>{
    const commands=message.content.split(' ')
    if(message.author.tag!="HEUEXE#6729"){
        if(commands[0]=="!playmusic"){
            const ytresourse = createAudioResource(ytdl(commands[1],{ filter: 'audioonly' }),{ inputType: StreamType.Arbitrary })
            const connection=joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            })
            player.play(ytresourse)
            connection.subscribe(player)
        }
        else{
            console.log(message.content+" message");
        }
    }
})