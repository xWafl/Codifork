import { Matcher } from "@enitoni/gears-discordjs";
import { Message } from "discord.js";
import { autoXpClaim } from "../knexCommon";

const symbols = ["-", "."] as const;

export const matchPrefixesStrict = (
    ...keywords: string[]
): Matcher => context => {
    const regex = new RegExp(
        `^(${keywords.join("|")})([^\\w]|$)( |[\\w]|(<@!?\\d+>)|${symbols.join(
            "|"
        )})*$`,
        "i"
    );

    const isMatching = !!context.content.match(regex) && !context.message.author.bot;
    if (!isMatching) {
        if (keywords[0] === "help|cmds|commands" && !context.message.author.bot) {
            context.message.delete(1000);
            context.message.channel.send(
                `**Invalid command, try:** \`cc!help\`**!**`
            ).then((msg: any) => msg.delete(10000)); //yes pls kill me for using then
        }
        return;
    }

    const newContent = context.content.replace(regex, "").trim();

    return { ...context, content: newContent };
};
