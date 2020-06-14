const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const ms = require('ms');
const { Client, MessageEmbed } = require('discord.js');
const AntiSpam = require('discord-anti-spam');

const client = new Discord.Client();
const prefix = '!';

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


client.on('message', (message) => antiSpam.message(message));

client.on('message', async message =>
{
//kick command
	if (message.content.startsWith("!kick")) {
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
	else if (message.content.startsWith("!ban")) {
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
// cat command
	if (command === 'cat')
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
		.setColor(0xff0000)
		.setDescription('Here`s the list of command that is available in this server')
		.addFields
		(
		{ name: '``!help``', value: 'to bring the manual' },
		{ name: '``!meme``', value: 'to send some dank and maybe toxic meme' },
		{ name: '``!urban [topic u want to search]``', value: 'to search something on urban dictionary' },
		{ name: '``!cat``', value: 'to get some floofy catto' },
		{ name: '``!dog``', value: 'to get your daily dose of doggo' },
		{ name: '``!search [topic u want to search]``', value: 'to search something in bing' },
		{ name: '``!server``', value: 'so u know how many people is in the server' },
		{ name: '``!user``', value: 'to see your ID' },
		{ name: '``!facts``', value: 'to see randomly facts (random langguage facts so its not always english)' },
		{ name: '``!pat``', value: 'to send patting gif' },
		{ name: '``!hug``', value: 'to send virtual hug' },
		{ name: '``!avatar``', value: 'to see others avatar or yours avatar' },
		{ name: '``!wink``', value: 'to send wink gif' },
		{ name: '``!kick``', value: 'to kick peasant' },
		{ name: '``!ban``', value: 'to ban people' },
		{ name: '``!ask [enter what u want to say]``', value: 'ask something to our bot that currently having a existential crisis' },
		{ name: '``!synonym [synonym u want to search]``', value: 'search synonym in thesaurus' },
		{ name: '``!textface``', value: 'textface collection to spice up the chat' },
		)
	.addField('That`s it', 'Please behave yourself if u want to send nsfw pic ( ͡° ͜ʖ ͡°) or swear words, please go to nsfw channel\nhope u enjoy your stay :)', true);
message.author.send(embed);
	}

// synonym command
	else if (command === 'synonym')
	{
		if (!args.length)
		{
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[1] === 'foo')
		{
			return message.channel.send('bar');
		}
		message.channel.send(`search result for ${args[0]}: https://www.merriam-webster.com/thesaurus/${args[0]}`);
		}

// textface command
		else if (command === 'textface')
		{
			message.channel.send(`check your private chat @${message.author.username} i send the greatest and most useful collection of textfaces ( ͡° ͜ʖ ͡°)`);
			const embed = new MessageEmbed()
			.setTitle('TEXTFACE HAVEN')
			.setColor(0xff0000)
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

//welcoming message
client.on("guildMemberAdd", member =>
{
	member.send(`Welcome on board! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`)
	member.send(`use !help in the server so i can send you the manual`)
})

client.login('bot token');
