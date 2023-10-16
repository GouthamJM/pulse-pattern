import { normalize } from "viem/ens";

export const getEnsData = async (name, client) => {
    const accountEnsKey = `ens-records-${name}`;

    const locallyStoredData = localStorage?.getItem(accountEnsKey);

    if (locallyStoredData) {
        return JSON.parse(locallyStoredData);
    }

    const records = Object.fromEntries(
        await Promise.all(
            Object.entries(recordsToRetrieve).map(async ([key, recordKey]) => {
                const recordValue = await client.getEnsText({
                    key: recordKey,
                    name: normalize(name),
                });

                return [key, recordValue];
            }),
        ),
    );

    localStorage?.setItem(accountEnsKey, JSON.stringify(records));

    return records;
};
