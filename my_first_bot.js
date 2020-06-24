const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const ms = require('ms');
const { Client, MessageEmbed } = require('discord.js');
const AntiSpam = require('discord-anti-spam');
let parse_ms = require('parse-ms')
let db = require('quick.db')
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = ';';

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

//anti spam
const antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
	banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 5000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
	kickMessage: '@**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
	banMessage: '@**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: [], // Array of User IDs that get ignored.
	// And many more options... See the documentation.
});


//console log
client.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));
client.once('ready', () =>
{
	console.log('Ready!');
});
//console log

//roles command

client.on("messageReactionAdd", async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
  // You should account for any errors while fetching, it could return API errors if the resource is missing.
  if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (reaction.message.guild.id !== "723135742859280385") return; // Use this if your bot was only for one server/private server.

  if (reaction.message.channel.id === "723135887906570322") { // This is a #self-roles channel.
    if (reaction.emoji.name === "🟠")
    {
      await reaction.message.guild.members.cache.get(user.id).roles.add("723163275600068738") // Minecraft role.

    }

    if (reaction.emoji.name === "🟣")
    {
      await reaction.message.guild.members.cache.get(user.id).roles.add("723163535588327474"); // Roblox role.

    }
    if (reaction.emoji.name === "🔵")
    {
      await reaction.message.guild.members.cache.get(user.id).roles.add("723163550591221831") // Minecraft role.

    }
    if (reaction.emoji.name === "🟤")
    {
        await reaction.message.guild.members.cache.get(user.id).roles.add("723163771169800223") // Minecraft role.

    }
    if (reaction.emoji.name === "🟡")
    {
        await reaction.message.guild.members.cache.get(user.id).roles.add("723163854510620694") // Minecraft role.

    }
    if (reaction.emoji.name === "🟢")
    {
      await reaction.message.guild.members.cache.get(user.id).roles.add("723164027026669588"); // Roblox role.

    }
  } else {
    return; // If the channel was not a #self-roles, ignore them.
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  // We're gonna make a trigger, if the user remove the reaction, the bot will take the role back.
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.guild.id !== "723135742859280385") return;

  if (reaction.message.channel.id === "723135887906570322") {
    if (reaction.emoji.name === "🟠")
    {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("723163275600068738") // Minecraft role.

    }

    if (reaction.emoji.name === "🟣")
    {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("723163535588327474"); // Roblox role.

    }
    if (reaction.emoji.name === "🔵")
    {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("723163550591221831") // Minecraft role.

    }
    if (reaction.emoji.name === "🟤")
    {
        await reaction.message.guild.members.cache.get(user.id).roles.remove("723163771169800223") // Minecraft role.

    }
    if (reaction.emoji.name === "🟡")
    {
        await reaction.message.guild.members.cache.get(user.id).roles.remove("723163854510620694") // Minecraft role.

    }
    if (reaction.emoji.name === "🟢")
    {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("723164027026669588"); // Roblox role.

    }

  } else {
    return;
  }
});



client.on('message', (message) => antiSpam.message(message));

client.on('message', async message =>
{

//kick command
	if (message.content.startsWith(";kick")) {
		const member = message.mentions.members.first()
		if (!member) {
			return message.reply(
				`Who are you trying to kick? You must mention a user.`
			)
		}
		if (!member.kickable) {
			return message.reply(`I can't kick this user. Sorry!`)
		}
		return member
			.kick()
			.then(() => message.reply(`${member.user.tag} was kicked.`))
			.catch(error => message.reply(`Sorry, an error occured.`))
	}
//ban command
	else if (message.content.startsWith(";ban")) {
		const member = message.mentions.members.first()
		if (!member) {
			return message.reply(
				`Who are you trying to ban? You must mention a user.`
			)
		}
		if (!member.bannable) {
			return message.reply(`I can't kick this user. Sorry!`)
		}
		return member
			.ban()
			.then(() => message.reply(`${member.user.tag} was banned.`))
			.catch(error => message.reply(`Sorry, an error occured.`))
	}




//swearing filter
	if(message.content.includes('asshole'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/asshole/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('shit'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/shit/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('Shit'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/Shit/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('fuck'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/fuck/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('Fuck'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/Fuck/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('tolol'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/tolol/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('Tolol'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/Tolol/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('bego'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/bego/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('Bego'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/Bego/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('jancuk'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/jancuk/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('Jancuk'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/Jancuk/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('kontol'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/kontol/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('Kontol'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/Kontol/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('memek'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/memek/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('nyepong'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/nyepong/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('cibay'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/cibay/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('idiot'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/idiot/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('cunt'))
  {
    let censor = "[explicit]";
    let edit = message.content.replace(/cunt/gi, censor);
    message.delete();
    message.channel.send(`${message.author.username}: ${edit}`);
    message.channel.send(`@${message.author.username} don't swear`);
  }
	else if(message.content.includes('dick'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/dick/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('Dick'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/Dick/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('fuck you'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/fuck you/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('dick head'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/dick head/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('son of a bitch'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/son of a bitch/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('bitch'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/bitch/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('wanker'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/wanker/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('assbanger'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/assbanger/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('assface'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/assface/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('cocksucker'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/cocksucker/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('shitbag'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/shitbag/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('tits'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/tits/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('jizzcock'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/jizzcock/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('cumdumpster'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/cumdumpster/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('wanki'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/wank/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('wanking'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/wanking/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('wanker'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/wanker/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('bellend'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/bellend/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
	else if(message.content.includes('ngentot'))
	{
		let censor = "[explicit]";
		let edit = message.content.replace(/ngentot/gi, censor);
		message.delete();
		message.channel.send(`${message.author.username}: ${edit}`);
		message.channel.send(`@${message.author.username} don't swear`);
	}
// end of swearing filter





	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();


	if (command === 'roles')
	{
		message.delete();
		let channel = client.channels.cache.get("723135887906570322"); // We want to sent the embed, directly to this channel.
		const embed = new Discord.MessageEmbed()
		.setColor(3447003)
		.setTitle("Pick your roles!")
		.setDescription(`🟠 APEX player \n\n 🟣 GTA player \n\n 🔵 Minecraft player \n\n 🟤 DOTA player \n\n 🟡CSGO player \n\n 🟢Valorant player`) // We're gonna try an unicode emoji. Let's find it on emojipedia.com !
		channel.send(embed).then(async msg =>
			{
			await msg.react("🟠");
			await msg.react("🟣");
			await msg.react("🔵");
			await msg.react("🟤");
			await msg.react("🟡");
			await msg.react("🟢");
			// We're gonna using an await, to make the react are right in order.
		});
	}

// cat command
	else if (command === 'cat')
	{
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

		message.channel.send(file);
	}
// dog command
	else if (command === 'dog')
	{
		const { link } = await fetch('https://some-random-api.ml/img/dog').then(response => response.json());

		message.channel.send(link);
	}
// meme command
	else if (command === 'meme')
	{
		const { image } = await fetch('https://some-random-api.ml/meme').then(response => response.json());

		message.channel.send(image);
	}
// wink command
	else if (command === 'wink')
	{
		const { link } = await fetch('https://some-random-api.ml/animu/wink').then(response => response.json());

		message.channel.send(link);
	}
// pat command
	else if (command === 'pat')
	{
		const { link } = await fetch('https://some-random-api.ml/animu/pat').then(response => response.json());

		message.channel.send(link);
	}
// hug command
	else if (command === 'hug')
	{
		const { link } = await fetch('https://some-random-api.ml/animu/hug').then(response => response.json());

		message.channel.send(link);
	}
// facts command
	else if (command === 'facts')
	{
		const { text } = await fetch('https://uselessfacts.jsph.pl/random.json').then(response => response.json());

		message.channel.send(text);
	}
// avatar command
	else if (command === 'avatar') {
	if (!message.mentions.users.size)
	{
		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
	}

	const avatarList = message.mentions.users.map(user =>
		{
		return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
		});
			// send the entire array of strings as a message
			// by default, discord.js will `.join()` the array with `\n`
			message.channel.send(avatarList);
		}
// server command
else if (command === 'server')
	{
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}
// user command
	else if (command === 'user')
	{
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
//search command
	else if (command === 'search')
	{
		if (!args.length)
		{
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[1] === 'foo')
		{
			return message.channel.send('bar');
		}

		message.channel.send(`search result for ${args[0]}: https://www.bing.com/search?q=${args[0]}`);
	}
	else if (command === 'joke')
	{
		const { text } = await fetch('https://icanhazdadjoke.com/').then(response => response.json());

		message.channel.send(text);
	}

// help command
	else if (command === 'help')
	{

		message.delete();
		message.channel.send(`check your private chat @${message.author.username} i send a manual :)`);
		const embed = new MessageEmbed()
		.setTitle('Help manual')
		.setColor(3447003)
		.setDescription('Here`s the list of command that is available in this server')
		.addFields
		(
		{ name: '``;help``', value: 'to bring the manual' },
		{ name: '``;meme``', value: 'to send some dank and maybe toxic meme' },
		{ name: '``;urban [topic u want to search]``', value: 'to search something on urban dictionary' },
		{ name: '``;cat``', value: 'to get some floofy catto' },
		{ name: '``;dog``', value: 'to get your daily dose of doggo' },
		{ name: '``;search [topic u want to search]``', value: 'to search something in bing' },
		{ name: '``;server``', value: 'so u know how many people is in the server' },
		{ name: '``;user``', value: 'to see your ID' },
		{ name: '``;facts``', value: 'to see randomly facts (random langguage facts so its not always english)' },
		{ name: '``;pat``', value: 'to send patting gif' },
		{ name: '``;hug``', value: 'to send virtual hug' },
		{ name: '``;avatar``', value: 'to see others avatar or yours avatar' },
		{ name: '``;wink``', value: 'to send wink gif' },
		{ name: '``;kick``', value: 'to kick peasant' },
		{ name: '``;ban``', value: 'to ban people' },
		{ name: '``;ask [enter what u want to say]``', value: 'ask something to our bot that currently having a existential crisis' },
		{ name: '``;textface``', value: 'textface collection to spice up the chat' },
		{ name: '``;roles``', value: 'to get roles' },
		{ name: '``;spotify [@ somebody]``', value: 'give info if that certain person is listening to spotify' }
		)
	.addField('That`s it', 'Please behave yourself if u want to send nsfw pic ( ͡° ͜ʖ ͡°) or swear words, please go to nsfw channel\nhope u enjoy your stay :)', true);
message.author.send(embed);
	}

// textface command
		else if (command === 'textface')
		{
			message.delete();
			message.channel.send(`check your private chat @${message.author.username} i send the greatest and most useful collection of textfaces ( ͡° ͜ʖ ͡°)`);
			const embed = new MessageEmbed()
			.setTitle('TEXTFACE HAVEN')
			.setColor(3447003)
			.setDescription('Here`s the list of textface that is currently available in this server')
			.addFields
			(
			{ value: '( ͡° ͜ʖ ͡°)' },
			{ value: '¯༽_(ツ)_༼¯' },
			{ value: '▄︻̷̿┻̿═━一' },
			{ value: '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)' },
			{ value: 'ʕ•ᴥ•ʔ' },
			{ value: '༼ つ ◕_◕ ༽つ' },
			{ value: '(▀̿Ĺ̯▀̿ ̿)' },
			{ value: '(ง ͠° ͟ل͜ ͡°)ง' },
			{ value: 'ಠ_ಠ' },
			{ value: '(づ｡◕‿‿◕｡)づ' },
			{ value: '┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴' },
			{ value: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)' },
			{ value: '( ͡°╭͜ʖ╮͡° )' },
			{ value: '﴾͡๏̯͡๏﴿ ORLY?' },
			{ value: '(ノಠ益ಠ)ノ彡┻━┻' },
			{ value: '(☞ﾟ∀ﾟ)☞' },
			{ value: '(ᵔᴥᵔ)' },
			{ value: '(づ￣ ³￣)づ' },
			{ value: '♪~ ᕕ(ᐛ)ᕗ' },
			{ value: '(;´༎ຶД༎ຶ`)' },
			{ value: '༼ つ  ͡° ͜ʖ ͡° ༽つ' },
			{ value: '~(˘▾˘~)' },
			{ value: '\ (•◡•) /' },
			{ value: '(._.) ( l: ) ( .-. ) ( :l ) (._.)' },
			{ value: '༼ʘ̚ل͜ʘ̚༽' },
			{ value: 'ᕦ(ò_óˇ)ᕤ' },
			{ value: 'ᕙ(⇀‸↼‶)ᕗ' },
			{ value: '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻' },
			{ value: '┬──┬ ノ( ゜-゜ノ)' },
			{ value: '( ⚆ _ ⚆ )' },
			{ value: 'ლ,ᔑ•ﺪ͟͠•ᔐ.ლ' },
			{ value: '(▰˘◡˘▰)' },
			{ value: '༼ ºل͟º ༼ ºل͟º ༼ ºل͟º ༽ ºل͟º ༽ ºل͟º ༽' },
		);
		message.author.send(embed);
		}

	//ask command
		else if (command ==='ask')
		{
			const query = querystring.stringify({ term: args.join(' ') });

			const { response } = await fetch(`https://some-random-api.ml/chatbot/?message=${query}`).then(response => response.json());

				message.channel.send(response);
		}
		else if (message.content.startsWith("!spotify"))
	  {
	    let user;
	    if (message.mentions.users.first())
	    {
	      user = message.mentions.users.first();
	    } else {
	      user = message.author;
	    }

	    let convert = require('parse-ms')

	    let status = user.presence.activities[0];

	    if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") return message.channel.send("This user isn't listening the Spotify.");

	    if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
	      let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
	          url = `https://open.spotify.com/track/${status.syncID}`,
	          name = status.details,
	          artist = status.state,
	          album = status.assets.largeText,
	          timeStart = status.timestamps.start,
	          timeEnd = status.timestamps.end,
	          timeConvert = convert(timeEnd - timeStart);

	      let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
	      let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;

	      let time = `${minutes}:${seconds}`;

	      const embed = new Discord.MessageEmbed()
	      .setAuthor("Spotify Track Information", "https://image.flaticon.com/icons/svg/2111/2111624.svg")
	      .setColor(0x1ED768)
	      .setThumbnail(image)
	      .addField("Name:", name, true)
	      .addField("Album:", album, true)
	      .addField("Artist:", artist, true)
	      .addField("Duration:", time, false)
	      .addField("Listen now on Spotify!", `[\`${artist} - ${name}\`](${url})`, false)
	      message.channel.send(embed)
	    }
	  }
// urban dictionary command
	else if (command === 'urban')
	{
		if (!args.length)
		{
			return message.channel.send('You need to supply a search term!');
		}

		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length)
		{
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}

		const [answer] = list;

		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addField('Definition', trim(answer.definition, 1024))
			.addField('Example', trim(answer.example, 1024))
			.addField('Rating', `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`);

		message.channel.send(embed);
	}
});
client.on("guildMemberAdd", member =>
{
	member.send(`Welcome on board! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`)
	member.send(`use !help in the server so i can send you the manual`)
})


client.login('your token goes here');

 function parseDur(ms)
 {
   let seconds = ms / 1000,
       days = parseInt(seconds / 86400);
   seconds = seconds % 86400

   let hours = parseInt(seconds / 3600);
   seconds = seconds % 3600

   let minutes = parseInt(seconds / 60);
   seconds = parseInt(seconds % 60)
   if (days)
 	{
     return `${days} day, ${hours} hours, ${minutes} minutes`
   } else if (hours) {
     return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
   } else if (minutes) {
     return `${minutes} minutes, ${seconds} seconds`
   }

  return `${seconds} second(s)`
}
