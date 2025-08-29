export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Configurable user details
    const FULL_NAME = 'abhinav_kushwaha';
    const DOB = '16062003';
    const EMAIL = 'abhinavkush2003@gmail.com';
    const ROLL = '22BCE1746';

    function isNumber(str) {
        return /^\d+$/.test(str);
    }

    function isAlpha(str) {
        return /^[a-zA-Z]+$/.test(str);
    }

    function toAlternatingCaps(str) {
        let res = '';
        let upper = true;
        for (let c of str) {
            if (/[a-zA-Z]/.test(c)) {
                res += upper ? c.toUpperCase() : c.toLowerCase();
                upper = !upper;
            } else {
                res += c;
            }
        }
        return res;
    }

    try {
        const data = req.body.data;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, user_id: `${FULL_NAME}_${DOB}` });
        }

        const even = [];
        const odd = [];
        const alpha = [];
        const special = [];
        let sum = 0;
        let concatAlpha = '';

        for (let item of data) {
            if (isNumber(item)) {
                const n = parseInt(item, 10);
                if (n % 2 === 0) even.push(item);
                else odd.push(item);
                sum += n;
            } else if (isAlpha(item)) {
                alpha.push(item.toUpperCase());
                concatAlpha += item;
            } else if (typeof item === 'string' && item.length > 0) {
                special.push(item);
            }
        }

        let allAlphaChars = concatAlpha.split('').reverse().join('');
        let concatString = toAlternatingCaps(allAlphaChars);

        res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL,
            odd_numbers: odd,
            even_numbers: even,
            alphabets: alpha,
            special_characters: special,
            sum: sum.toString(),
            concat_string: concatString
        });
    } catch (e) {
        res.status(500).json({ is_success: false, user_id: `${FULL_NAME}_${DOB}` });
    }
}
