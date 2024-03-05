import { error } from '@sveltejs/kit';
import { adminAuth, adminDB } from '$lib/server/admin';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const sessionCookie = cookies.get('__session');

    try {
        const decodeClaims = await adminAuth.verifySessionCookie(sessionCookie!)
        const userDoc = await adminDB.collection('users').doc(decodeClaims.uid).get();
        const userData = userDoc.data();

        return {
            bio: userData?.bio
        }
    } catch (e) {
        console.log(e);

        throw error(401, 'Unauthorized request!')
    }
}) satisfies PageServerLoad;