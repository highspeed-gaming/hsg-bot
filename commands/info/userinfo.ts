import { Command } from 'discord-akairo';
import { User, MessageEmbed, GuildMember } from 'discord.js';
import moment = require('moment');
import { capitalize, embedColor, getAuthLvlFromMember } from '../../utils/functions';
import { MESSAGES, TIME_FORMAT } from '../../utils/constants';
import { HMessage } from '../../utils/classes/HMessage';

type AcceptedIdOrTitle = string | string[];
const acknowledgements: { id: AcceptedIdOrTitle, title: AcceptedIdOrTitle, type: 'user' | 'role'}[] = [
    {
        id: '264662751404621825',
        title: [
            'Bot Developer',
            'Follow me on [Twitter](https://twitter.com/Zeemah_)'
        ],
        type: 'user'
    },
    {
        id: '625068930485977138',
        title: 'Super cool',
        type: 'role'
    }
];

export default class UserInfo extends Command {
    public constructor() {
        super('whois', {
            aliases: [ 'whois', 'userinfo' ],
            description: {
                content: MESSAGES.COMMANDS.USER_INFO.DESCRIPTION,
                usage: '<user>',
                examples: [ '608362769032675348', 'Zeemah' ]
            },
            category: 'info',
            channel: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: (message: HMessage) => message.author,
                    prompt: {
                        start: (message: HMessage) => MESSAGES.COMMANDS.USER_INFO.PROMPT.START(message.author),
                        optional: true
                    },
                    match: 'content'
                }
            ],
            userPermissions: [ 'MANAGE_MESSAGES' ],
            clientPermissions: [ 'EMBED_LINKS' ]
        });
    }

    public exec(message: HMessage, { user }: { user: User }) {
        message.delete();

        const currentDate: Date = new Date();

        const localAcknowledgements: { [key: string]: string[] } = {};
        localAcknowledgements[user.id] = [];

        const embed: MessageEmbed = new MessageEmbed();

        const member: GuildMember = message.guild.members.cache.find(fm => fm.id === user.id);
        const authLvl = !member.user.bot ? getAuthLvlFromMember(member) : null;

        if (!(member instanceof GuildMember)) {
            return message.reply('I couldn\'t find that member.');
        }

        for (const [ , acknowledgement ] of Object.entries(acknowledgements)) {
            const addTitle = (): void | number => Array.isArray(acknowledgement.title) ? acknowledgement.title.forEach(title => localAcknowledgements[user.id].push(title)) :
                localAcknowledgements[user.id].push(acknowledgement.title);
            if (acknowledgement.type === 'user') {
                if (user.id === acknowledgement.id) {
                    addTitle();
                }
            }

            if (acknowledgement.type === 'role') {
                if (typeof acknowledgement.id === 'object') {
                    for (const [ , roleId ] of Object.entries(acknowledgement.id)) {
                        if (member.roles.cache.has(roleId)) {
                            addTitle();
                        }
                    }
                } else {
                    if (member.roles.cache.has(acknowledgement.id)) {
                        addTitle();
                    }
                }
            }
        }

        if (user.bot && user.id !== this.client.user.id && !member.roles.cache.find(r => r.name.includes('HighSpeed-Gaming'))) {
            localAcknowledgements[user.id].push(`Less cool than <@${this.client.user.id}>`);
        }

        if (message.guild.owner?.id === user.id) {
            localAcknowledgements[user.id].push('Server Owner');
        }

        embed.setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL() ?? undefined);
        if (user.avatarURL()) {
            embed.setThumbnail(user.avatarURL());
        }

        if (member.nickname) {
            embed.addField('❯ Nickname', member?.nickname);
        }

        if (user.presence !== undefined) {
            const status: string = user.presence.status.length > 3 ? capitalize(user.presence.status) : user.presence.status.toUpperCase();
            embed.addField('❯ Status', status, true);
        }

        const joinedAt: moment.Moment = moment(member.joinedAt!);
        embed.addField('❯ Joined', `${joinedAt.format(TIME_FORMAT)} (${moment(currentDate).diff(joinedAt, 'days')} days ago)`, true);

        const createdAt: moment.Moment = moment(user.createdAt);
        embed.addField('❯ Registered', `${createdAt.format(TIME_FORMAT)} (${moment(currentDate).diff(createdAt, 'days')} days ago)`);

        const ammountOfRoles: number = member.roles.cache.array().length - 1;

        const roles: string = ammountOfRoles > 0 ?
            member.roles.cache.map(role => role.id !== role.guild.id ? `<@&${role.id}>` : '').join(' ') :
            'This user doesn\'t have any roles.';
        embed.addField(`❯ Roles [${ammountOfRoles}]`, roles);

        if (authLvl) {
            embed.addField('Authorization Level', `${authLvl.longName} | ${authLvl.acronym}`);
        }

        if (localAcknowledgements[user.id].length > 0) {
            embed.addField('❯ User Acknowledgements', localAcknowledgements[user.id].map((title: string) => '• ' + title));
        }

        embed.setColor(message.guild.me?.roles.color ? message.guild.me.roles.color!.color : embedColor);
        if (member.roles.color) {
            embed.setColor(member.roles.color.color);
        }

        embed.setFooter('Requested by ' + message.author.tag);

        return message.util?.send(embed);
    }
}
