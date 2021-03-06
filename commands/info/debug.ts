import { Command } from 'discord-akairo';
import { doesArrayHaveElement, doesXExistOnGuild, embedAuthIcon, embedFooter, convertBoolToStrState, convertDecToHex } from '../../utils/functions';
import { Role, MessageEmbed } from 'discord.js';
import { MESSAGES } from '../../utils/constants';
import { HMessage } from '../../utils/classes/HMessage';

const supportedDebugTypes: string[] = [
    'role',
    'user',
    'guild',
    'roles'
];

const randomString = 'noc7ct43ilasietcasdfpcas[odfca[sfpozas;fz[a#o23z[#a[rs3raw[rxiaweee-]rxairx-aesworxaiwe-]#zreiq]-##';

export default class Debug extends Command {
    /*
    constructor(client: CommandoClient) {
        super(client, {
            name: 'debug',
            group: 'information',
            memberName: 'debug',
            description: MESSAGES.COMMANDS.DEBUG.DESCRIPTION,
            args: [
                {
                    key: 'type',
                    prompt: 'What do you want to debug?',
                    type: 'string',
                    default: ((m: CommandoMessage) => m.author.id === this.client.owners.find(c => c.id === '264662751404621825')?.id ? '' : randomString)
                },
                {
                    key: 'obj',
                    prompt: 'Parameter that is relative to first argument provided.',
                    type: 'string',
                    default: ''
                }
            ],
            ownerOnly: true,
            examples: [
                `${client.commandPrefix}debug role Administration`,
                `${client.commandPrefix}debug user 691446412419923968`,
                `${client.commandPrefix}debug guild`,
                `${client.commandPrefix}debug roles`
            ]
        });
    }
    */

    public constructor() {
        super('debug', {
            aliases: [ 'debug' ],
            description: {
                content: MESSAGES.COMMANDS.DEBUG.DESCRIPTION
            },
            category: 'info',
            channel: 'guild',
            clientPermissions: [ 'EMBED_LINKS' ],
            ownerOnly: true,
            args: [
                {
                    id: 'type',
                    prompt: {
                        start: (message: HMessage) => MESSAGES.COMMANDS.DEBUG.PROMPT.START(message.author)
                    },
                    type: 'string'
                },
                {
                    id: 'obj',
                    prompt: {
                        start: (message: HMessage) => MESSAGES.COMMANDS.DEBUG.PROMPT.START_2(message.author)
                    },
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    public exec(message: HMessage, { type, obj }: { type: string, obj: string }) {
        if (type === randomString) {
            return undefined;
        }

        if (!doesArrayHaveElement(supportedDebugTypes, type)) {
            return message.reply(type === '' ? 'please input a debug type' : 'that is not a supported debug type.');
        }

        const embed = new MessageEmbed()
            .setAuthor(`Debug [${type}]`, embedAuthIcon)
            .setColor('#E4C341')
            .setFooter(embedFooter);

        if (supportedDebugTypes.find(i => i === 'role') !== undefined && type === 'role') {
            let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === obj.toLowerCase());

            if (role === undefined) {
                role = message.guild.roles.cache.get(obj);
            }

            if (!doesXExistOnGuild(role, message.guild)) {
                return message.reply('I could not find that role, sorry!');
            }

            function getRoleColor(inputRl: Role): string {
                const col = convertDecToHex(inputRl.color);
                if (col === '0') {
                    return 'Default';
                }

                return `#${col}`;
            }

            delete embed.author;
            embed.addField('ID', role.id, true);
            embed.addField('Name', role.name, true);
            embed.addField('Color', getRoleColor(role), true);
            embed.addField('Mention', `<@&${role.id}>`, true);
            embed.addField('Total Members', role.members.size, true);
            embed.addField('Hoisted', convertBoolToStrState(role.hoist, true), true);
            embed.addField('Position', role.position, true);
            embed.addField('Mentionable', convertBoolToStrState(role.mentionable, true), true);
            embed.setFooter('Role Created');
            embed.setTimestamp(role.createdTimestamp);

            return message.reply(embed);
        } else if (supportedDebugTypes.find(i => i === 'roles') !== undefined && type === 'roles') {
            const roles = message.guild.roles.cache.filter(r => r.id !== message.guild.id && r.name !== '--------------');

            roles.forEach(role => {
                embed.addField(role.name, `ID: \`${role.id}\` | Members \`${role.members.size}\` ` +
                `| Color \`${convertDecToHex(role.color) !== '0' ? `#${convertDecToHex(role.color).toUpperCase()}` : 'Default'}\``);
            });

            return message.reply(embed);
        }
    }
}
