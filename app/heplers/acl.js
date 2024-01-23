export const checkRights = (access, user, lead, groups, session) => {

    if (Number(user[access]) === 0) {
        return false;
    }
    if (Number(user[access]) === 3) {
        return true;
    }
    if (Number(lead.responsible_id) === Number(session.user_id)) {
        if (Number(user[access]) > 0) {
            return true;
        }
    } else {
        if (Number(user[access]) == 2) {
            try {
                const current_user = groups.filter(group => Number(group.amo_group_id) == Number(lead.responsible_id))
                if (Number(leadUserGroup[0].amo_group_id) === Number(current_user.group_id)) {
                    return true;
                }
            } catch (e) {
                return false;
            }
        }
    }
    return false;
}