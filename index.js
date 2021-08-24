const {Collection, Client, Discord} = require('discord.js')
const { MessageEmbed } = require(`discord.js`);
const fs = require('fs')
const db = require("megadb")
const blacklist = new db.crearDB(`blacklist`)
const { isRegExp } = require('util');
const client = new Client({
    disableEveryone: true
})

const config = require('./config.json')
const prefix = config.prefix
client.ticketCategory = `874027116159709245`
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
module.exports = client;
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

const estados = [`${prefix}help`]

client.on(`ready`, () => {

  setInterval(() => {
    function presence() {
      client.user.setPresence({
        status: "online",
        activity: {
          name: estados[Math.floor(Math.random()* estados.length)],
          type: `PLAYING`,
        }
      })
    }
    presence()
  }, 5000);


    console.log(`${client.user.username} ✅`)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

client.on("message", async(message) => {
if(message.channel.parentID !== `874027116159709245`) return;
})

client.on("message", message => {
    if(message.content.startsWith(`hola`)){
        const embed = new MessageEmbed()
        .setTitle(`hola! ${message.author.tag}`)
        .setDescription("si necesitas ayuda coloca `x!help`")
        message.reply(embed)
    }


})





client.on("guildMemberAdd", member => {
  if(blacklist.tiene(member.user.id)) member.ban({reason: `esta en la blacklist`});



})




for(const file of fs.readdirSync(`./eventos`)){
  if(file.endsWith(`.js`)){
    let fileName = file.substring(0, file.length - 3)

    let fileContents = require(`./eventos/${file}`)

    client.on(fileName, fileContents.bind(null, client))
  }
}

client.on("message", message => {
  if(message.content.startsWith(`=stock`)){
    if(message.author.bot) return;
    if(message.channel.id === `879372168142680144`){

const embed = new MessageEmbed()
.setTitle(`Stock`)
.setDescription(`las cuentas haun no han sido cargadas ya que estoy en estado de creacion!`)
.addField(`Crunchyroll`, "`No disponible`")
.addField(`netflix`, "`No disponible`")
.addField(`spotify`, "`No disponible`")
.addField(`Minecraft`, "`No disponible`")
.addField(`call of duty`, "`No disponible`")
.addField(`duolingo`, "`Disponible`")
.addField(`Disney plus`, "`No disponible`")
.addField(`funimation`, "`No disponible`")
.addField(`pornhub`, "`No disponible`")
.addField(`Curiositystream`, "`Disponible`")
.setFooter("para generar uan cuenta escribe =gen [objeto disponible en la stock]")
message.channel.send(embed)
    }
    else{
      message.reply(`este comando no se puede usar en este canal, el comando usalo en <#879372134567280700>`)
    }
  }
})


client.on("message", message => {
  if(message.content.startsWith(`=gen Curiositystream`)){
    if(message.channel.id === `879372134567280700`){
  var palabras = [`randy@kassassociates.com:rskcpa2444`, `somersetbex@gmail.com:nto3aejvan`, `sparkee987@yahoo.com:brysonayla`, `subie1@xtra.co.nz:starfish27`, `sunandosen@gmail.com:atall2times`, `alejadrian@gmail.com:Bellab1ue`, `chrisdawson290@gmail.com:pioneer`, `ayataorcun@gmail.com:34orcun842`, `skorchmeister13@gmail.com:spring101`, `globalwarning98@gmail.com:filippos1998`, `jancicd@gmail.com:messenger667`]
  const palabrafinal = palabras[Math.floor(Math.random()* palabras.length)]

const embed = new MessageEmbed()
.setTitle(`Cuenta de Curiositystream Generada`)
.setDescription(`cuenta generada, recuerda que si no te funciona reportala con Trxsh: **${palabrafinal}**`)
.setColor(`GREEN`)
message.channel.send(`la cuenta ha sido generada, revisa tus mensajes internos`)
message.author.send(embed)
    }
    else {
      message.reply(`este comando solo se puede usar en el canal <#879372168142680144>`)
    }

  }

})

client.on("message", message => {
  if(message.content.startsWith(`=gen duolingo`)){
    if(message.channel.id === `879372134567280700`){
      var cuentas = [`dexterharris3@yahoo.com:11blackie15`, `cquarls@gmail.com:idontknow17`, `dkwhitaker2@gmail.com:Linclon1`, `ecerbie@gmail.com:AndySixx6`, `hannah.davison1@gmail.com:cows2002`, `entileguillermina@gmail.com:spybar1122`, `jennyjo242@aol.com:theeya1121`, `marvelgirldc1995@gmail.com:shawesome3`, `mikhailanoki@gmail.com:beardie2`, `smauck7777@gmail.com:stephanniemeyers`, `shane_boss@hotmail.com:sp1der8ite`, `sam7ewing@gmail.com:15august89`, `mikeoslo@outlook.com:get39cat`, `redwings8808@yahoo.com:Mobius01`]
      const cuentasfinal = cuentas[Math.floor(Math.random()* cuentas.length)]
      const embed = new MessageEmbed()
    .setTitle(`Cuenta de duolingo Generada`)
    .setDescription(`tu cuenta de duolingo ha sido generada, recuerda que si no te funciona reportalo con Trxsh: **${cuentasfinal}**`)
  message.channel.send(`cuenta generada revisa tus mensajes internos`)
  message.author.send(embed)  
  }
  else{
    message.reply(`este comando solo se puede usar en el canal de <#879372134567280700>`)
  }
  }
})






client.login(token)
