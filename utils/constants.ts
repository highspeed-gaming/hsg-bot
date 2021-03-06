import { Guild, GuildMember, User } from 'discord.js';
import { stripIndents } from 'common-tags';

export const MESSAGES = {
    COMMAND_HANDLER: {
        MODIFY_START: (str: string) => `${str}\n\nType \`cancel\` to cancel the command.`,
        MODIFY_RETRY: (str: string) => `${str}\n\nType \`cancel\` to cancel the command.`,
        TIMEOUT: 'You took too long. The command has been cancelled.',
        ENDED: 'You exceeded the maximum amount of tries for this command. The command has been cancelled.',
        CANCEL: 'The command has been cancelled.'
    },

    COMMANDS: {
        ANNOUNCE: {
            DESCRIPTION: 'Sends an announcement to the channel.',
            PROMPT: {
                START: (author: User) => `${author}, what do you want to announce?`
            }
        },

        CHANGELOG: {
            DESCRIPTION: 'Sends a server changelog to the channel.',
            PROMPT: {
                START: (author: User) => `${author}, what are the changes?`
            }
        },

        CMDS: {
            DESCRIPTION: 'Shows all available admin commands.'
        },

        CLOSE: {
            DESCRIPTION: 'Deletes a report.'
        },

        GRANT_ROLE: {
            DESCRIPTION: 'Grants Casual Player role to any member in this guild who has been a member for more than 2 days and has not received Casual Player.'
        },

        PINFO: {
            DESCRIPTION: 'Returns information about a player on the FiveM server.',
            PROMPT: {
                START: () => 'A player who is active in the server. Takes any player identifier - Steam, Game License, IP, FiveM Forum ID, Server ID',
                START_2: (author: User) => `${author}, which server is this player on?`
            }
        },

        PURGE: {
            DESCRIPTION: 'Deletes a specific amount of messages from the current channel.',
            PROMPT: {
                START: (author: User) => `${author}, how many messages would you like to purge?`,
                RETRY: (author: User) => `${author}, that is an invalid amount to purge.`
            }
        },

        COPY: {
            DESCRIPTION: 'Copies the content of a report and places elsewhere for logging.',
            PROMPT: {
                START: (author: User) => `${author}, which message would you like to copy?`
            }
        },

        STICKY: {
            DESCRIPTION: 'Sticks a message to the bottom of a channel.'
        },

        STICKY_CLEAR: {
            DESCRIPTION: 'Toggles the state of the existing sticky to false.'
        },

        SUGGESTION: {
            DESCRIPTION: 'Moves an announcement to a more organised category for organisation. Use this command in the suggestions channel!',
            PROMPT: {
                START: (author: User) => `${author}, please post the ID of the suggestion message.`,
                START_2: (author: User) => `${author}, please type the category of the suggestion.`,
                START_3: (author: User) => `${author}, what type of suggestion is this? A feature or fix?`
            }
        },

        BOT_INFO: {
            DESCRIPTION: 'Returns information about this bot.'
        },

        C_HELP: {
            DESCRIPTION: 'Shows information about a command.'
        },

        DEBUG: {
            DESCRIPTION: 'Returns information about items which may serve use for developers.',
            PROMPT: {
                START: (author: User) => `${author}, what information would you like to debug?`,
                START_2: (author: User) => `${author}, please input an argument relative to the first.`
            }
        },

        HELP: {
            DESCRIPTION: 'Displays information about the community.',
            REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`A list of available commands.
                For additional information about a command, use \`${prefix}help <command>\`
            `
        },

        PLIST: {
            DESCRIPTION: 'Displays a list of players for any HSG FiveM server.',
            PROMPT: {
                START: (author: User) => `${author}, which server would you like to show players for?`
            }
        },

        SINFO: {
            DESCRIPTION: 'Displays information about the server(s).'
        },

        STAFF: {
            DESCRIPTION: 'Displays a list of staff members in a hierarchical order.',
            PROMPT: {
                START: (author: User) => `${author}, which staff rank do you wish to list members for?`
            }
        },

        USER_INFO: {
            DESCRIPTION: 'Returns information about a specific user.',
            PROMPT: {
                START: (author: User) => `${author}, which user would you like to display information for?`
            }
        },

        DOCS: {
            DESCRIPTION: 'Queries arguments for results from Discord.js documentation.',
            PROMPT: {
                START: (author: User) => `${author}, what would you like to query?`
            }
        },

        TICKET: {
            DESCRIPTION: 'Creates a new ticket.',
            PROMPT: {
                START: (author: User) => `${author}, please provide a short description for your ticket.`
            }
        },

        BLEET: {
            DESCRIPTION: 'Sends a Bleet.',
            PROMPT: {
                START: (author: User) => `${author}, what do you want to Bleet?`
            }
        },

        SERVER_LOCK: {
            DESCRIPTION: 'Locks the FiveM server to a specific authorization level.',
            PROMPT: {
                START: (author: User) => `${author}, what authorization would you like to lock the server to?`,
                RETRY: (author: User) => `${author}, that is not a valid authorization level.`
            }
        },

        ALVL_SET: {
            DESCRIPTION: 'Sets a player\'s authorization level in the FiveM server.',
            PROMPT: {
                START: (author: User) => `${author}, which player would you like to change authorization level for?`,
                START_2: (author: User) => `${author}, what would you like to set their authorization level to?`,
                RETRY: (author: User) => `${author}, that is an invalid number.`,
                RETRY_2: (author: User) => `${author}, please choose a valid authorization level.`
            }
        },

        MEMBER_CHAT: {
            DESCRIPTION: 'Sends a message from Discord to in-game for Members to view (M1+)',
            PROMPT: {
                START: (author: User) => `${author}, what message would you like to send to the FiveM server (M1+ read).`
            }
        },

        STAFF_CHAT: {
            DESCRIPTION: 'Sends a message from Discord to in-game for General Staff.',
            PROMPT: {
                START: (author: User) => `${author}, what message would you like to send to the FiveM server (GS+ read).`
            }
        },

        ADMIN_CHAT: {
            DESCRIPTION: 'Sends a message from Discord to in-game for Administrators (A1+)',
            PROMPT: {
                START: (author: User) => `${author}, what message would you like to send to the FiveM server (A1+ read).`
            }
        },

        ADMIN_CHAT_RESTR: {
            DESCRIPTION: 'Sends a message from Discord to in-game for Lead Administrators (A3+)',
            PROMPT: {
                START: (author: User) => `${author}, what message would you like to send to the FiveM server (A3+ read).`
            }
        },

        GITHUB_ISSUE_PR: {
            DESCRIPTION: 'Returns information about a specified issue or PR.',
            FAILURE: 'Could not find information regarding that issue or PR.',
            NO_GITHUB_API_KEY: 'GitHub API key has not been set.'
        },

        GET_VOTES: {
            DESCRIPTION: 'Returns reactions for a message only counting one reaction per person.'
        },

        DM: {
            DESCRIPTION: 'Allows for SMRE officials to send members messages through the bot.',
            PROMPT: {
                START: (author: User) => `${author}, who would you like to directly message?`,
                START_2: (author: User) => `${author}, what message would you like to send?`
            }
        },

        TRASH: {
            DESCRIPTION: 'Cleans out the trash. (Syncs bans across all guilds).'
        },

        EVAL: {
            DESCRIPTION: 'Runs code.',
            PROMPT: {
                START: (author: User) => `${author}, what would you like to evaluate?`
            }
        }
    },

    ACTIONS: {
        MEMBER_JOIN: {
            ON_FAIL: (member: GuildMember) => `Member ${member.user.tag} joined the Discord, but I could not send them the introduction message as their DMs are disabled.`
        },

        ON_GUILD_JOIN: (guild: Guild) => `Joined guild ${(guild.name).green} with ${guild.members.cache.size.toString().green} members.`
    },

    GROUPS: {
        MISC: {
            DESCRIPTION: 'Miscellaneous commands that don\'t fit in other groups.'
        },

        INFO: {
            DESCRIPTION: 'Commands that provide useful information to the user.'
        },

        ADMIN: {
            DESCRIPTION: 'Commands to help administration give out information and perform their tasks more easily.'
        }
    }
};

/**
 * Gets the path at which the sticky data is stored for a guild.
 *
 * @param guild The guild to get sticky information for.
 */
export const getStickyDataPath = (guild: Guild) => `./data/sticky_${guild.id}.json`;

export const HSG_AUTHS: {
    [key: string]: string
} = {
    CR: 'Casual Restricted',
    CU: 'Casual Unrestricted',
    M1: 'New Member',
    M2: 'Member',
    GS: 'General Staff',
    A1: 'Administrator',
    A2: 'Senior Administrator',
    A3: 'Lead Administrator',
    DV: 'Developer',
    CD: 'Chief of Development',
    DR: 'Director'
};

export const TIME_FORMAT = 'ddd, MMM D, YYYY H:mm A';