// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'

// import { stripe } from '../../../lib/stripe'

// export async function POST() {
//     try {
//         const headersList = await headers()
//         const origin = headersList.get('origin')

//         // Create Checkout Sessions from body params.
//         const session = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//                     // price: '{{PRICE_ID}}',

//                     price: 'price_1TqRgzPAc7ZN3a54aRSyPlMX',
//                     quantity: 1,
//                 },
//             ],
//             mode: 'subscription',
//             success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//         });
//         return NextResponse.redirect(session.url, 303)
//     } catch (err) {
//         return NextResponse.json(
//             { error: err.message },
//             { status: err.statusCode || 500 }
//         )
//     }
// }

//updated
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';

export async function POST(request) {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');
        const { ebookId, title, price, coverImage, buyerId, writerId } = await request.json();

        if (!ebookId || !price) {
            return NextResponse.json(
                { error: "ebookId and price are required" },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: title,
                            images: coverImage ? [coverImage] : [],
                        },
                        unit_amount: Math.round(price * 100), // dollar -> cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                ebookId,
                buyerId: buyerId || "guest",
                writerId: writerId || "",
            },
            success_url: `${origin}/ebooks/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/ebooks/${ebookId}`,
        });

        // JSON e url return, not server-side redirect 
        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("Checkout session error:", err);
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}