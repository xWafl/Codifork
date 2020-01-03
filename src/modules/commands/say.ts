import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import { autoXpClaim } from "../../common/knexCommon";

export default new CommandBuilder()
    .match(matchPrefixesStrict("say"))
    .use<ParseArgumentsState>(context => {
        const { message } = context;
        const { args } = context.state;

        if (!args.length) {
            return message.channel.send(`Absolutely nothing.`);
        }

        return message.channel.send(`${args.join(" ")}`);
    })
    .done();
