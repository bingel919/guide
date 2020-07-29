function NumberToEmoji(number)
{
	switch (number)
	{
		case 0:
		return ':one:';
		break;
		case 1:
		return ':two:';
		break;
		case 2:
		return ':three:';
		break;
		case 3:
		return ':four:';
		break;
		case 4:
		return ':five:';
		break;
		case 5:
		return ':six:'
			break;
	}
}
function ScoreToResult(score)
{
	switch (score)
	{
		case 0:
		return 'Nothing!';
		break;
		case 1:
		return 'Pair.';
		break;
		case 2:
		return 'Two Pairs!';
		break;
		case 3:
		return 'Three-of-a-Kind!';
		break;
		case 4:
		return 'Five-High-Straight!';
		break;
		case 5:
		return 'Six High-Straight!';
		break;
		case 6:
		return 'Full House!';
		break;
		case 7:
		return 'Four-of-a-Kind!';
		break;
		case 8:
		return 'Five-of-a-Kind!';
	}
}
function CheckHand(dices)
{
	var match = 0;
	var different = -1;
	var save = -1;
	for (var i = 0; i < 5; i++)
	{
		for (var j = i+1; j< 5; j++)
		{
			if (dices[i] == dices [j])
			{
				match++;
				if (dices[i] != save)
				{
					save = dices[i];
					different++;
				}
			}
		}
	}
	 console.log(`Match: ${match} ; Different: ${different}`);
	if (match == 0 && different == -1)
	{
		var sum = 0;
		for (var i = 0; i < 5; i++)
		{
			sum += dices[i];
		}
		if (sum == 15)
			return 4
		if (sum == 20)
			return 5;
		return 0;
	}
	if (match == 1)
	{
		return 1;
	}
	if (match == 2 && different >= 1)
	{
		return 2;
	}
	if (match == 3 && different == 0)
	{
		return 3;
	}
	if (match == 4 && different == 0)
		return 7;
	if (match ==10 && different == 0)
		return 8;
	if (match ==4 && different >= 1)
		return 6;
	return -1;
}
module.exports = {
	name: 'dice',
	description: 'dice',
	execute(message, args) {
		const taggedUser = message.mentions.users.first();
		if (args == 'help')
		{
			message.channel.send('https://media.discordapp.net/attachments/727127695095496715/737967380990263377/unknown.png');
		}
		else
		if (taggedUser && taggedUser!=message.author)
		{
			var dices1 = [Math.floor(Math.random() * 5),Math.floor(Math.random() * 5),Math.floor(Math.random() * 5),Math.floor(Math.random() * 5),Math.floor(Math.random() * 5)];
			var dices2 = [Math.floor(Math.random() * 5),Math.floor(Math.random() * 5),Math.floor(Math.random() * 5),Math.floor(Math.random() * 5),Math.floor(Math.random() * 5)];
			message.channel.send(`${message.author.username}\'s dices are ${NumberToEmoji(dices1[0])}, ${NumberToEmoji(dices1[1])}, ${NumberToEmoji(dices1[2])} , ${NumberToEmoji(dices1[3])}, ${NumberToEmoji(dices1[4])}`);
			message.channel.send(`${taggedUser.username}\'s dices are ${NumberToEmoji(dices2[0])}, ${NumberToEmoji(dices2[1])}, ${NumberToEmoji(dices2[2])} , ${NumberToEmoji(dices2[3])}, ${NumberToEmoji(dices2[4])}`);
			message.channel.send(`${message.author.username} got a ${ScoreToResult(CheckHand(dices1))}`);
			message.channel.send(`${taggedUser.username} got a ${ScoreToResult(CheckHand(dices2))}`);
			if (CheckHand(dices1)>CheckHand(dices2))
				message.channel.send(`${message.author.username} won!`);
			else if (CheckHand(dices1)<CheckHand(dices2))
				message.channel.send(`${taggedUser.username} won!`);
			else
				message.channel.send(`It\'s a draw!`);
		}
		else
		{
			message.channel.send('Well ain\'t you lonely?');
		}
	},
};
