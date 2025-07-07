# Feedback Form Setup Guide

## 📧 Email Integration Setup

To receive feedback emails in your Gmail account, follow these steps:

### Option 1: Formspree (Recommended - Easy Setup)

1. **Sign up at Formspree**: https://formspree.io/
2. **Create a new form**:
   - Click "New Form"
   - Enter your Gmail address
   - Name it "StreamSearch Feedback"
3. **Get your form endpoint**:
   - Copy the form endpoint (looks like `https://formspree.io/f/YOUR_FORM_ID`)
4. **Update the code**:
   - Open `src/components/FeedbackForm.tsx`
   - Replace `YOUR_FORM_ID` with your actual form ID

### Option 2: EmailJS (Alternative)

1. **Sign up at EmailJS**: https://www.emailjs.com/
2. **Create email service**:
   - Connect your Gmail account
   - Create a service and template
3. **Update environment variables**:
   ```bash
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
   ```

## 🔧 Quick Formspree Setup (5 minutes)

1. Go to https://formspree.io/
2. Click "Start for Free"
3. Sign up with your email
4. Click "New Form"
5. Enter your Gmail address where you want to receive feedback
6. Copy the form ID from the URL or endpoint
7. Update the FeedbackForm component

## 📋 What You'll Receive

Each feedback email will include:
- Usability rating (1-5)
- Whether recommendations made sense
- Missing content suggestions
- Bug reports
- Whether they'd actually use the app
- Open feedback
- Optional email for follow-up
- Optional screenshot attachment
- Timestamp and browser info for debugging

## 🎯 Benefits

- **No backend required** - works with static deployment
- **File uploads supported** - users can attach screenshots
- **Spam protection** - Formspree handles spam filtering
- **Professional emails** - nicely formatted feedback emails
- **Free tier available** - 50 submissions/month on free plan

## 🚀 Next Steps

1. Set up Formspree account
2. Update form ID in FeedbackForm.tsx  
3. Test the feedback form
4. Deploy to Vercel
5. Start collecting user feedback!

The feedback form is already integrated into the app with a floating button in the bottom-right corner.
