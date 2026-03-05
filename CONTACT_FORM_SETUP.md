# Contact Form Setup - EmailJS

Your portfolio contact form uses **EmailJS** for reliable email delivery. Works everywhere: local files, localhost, and deployed sites!

## 🚀 One-Time Setup (5 minutes)

### Step 1: Create Free EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's free - 200 emails/month)
3. Verify your email address

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or any email provider)
4. Connect your Gmail: `unnatitank14@gmail.com`
5. Note the **Service ID** (e.g., `service_abc1234`)

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Set template name: `Contact Form`
4. Use this template content:

```
Subject: New Portfolio Contact from {{from_name}}

From: {{from_name}}
Email: {{reply_to}}

Message:
{{message}}
```

5. Note the **Template ID** (e.g., `template_xyz5678`)

### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (looks like: `xYzAbC123DeFgHi`)
3. Copy it

### Step 5: Update Your Code

Open `index.html` and find this line (around line 33):

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

Replace with:
```javascript
emailjs.init("xYzAbC123DeFgHi");  // Your actual public key
```

Open `script.js` and find this line (around line 405):

```javascript
emailjs.sendForm('service_portfolio', 'template_contact', form)
```

Replace with:
```javascript
emailjs.sendForm('service_abc1234', 'template_xyz5678', form)
```
(Use your actual Service ID and Template ID)

## ✅ Testing

### Test Locally (Works with file://)
1. Just open `index.html` in your browser
2. Fill the contact form
3. Click "Send Message"
4. Check your Gmail for the message!

### Test on localhost
```bash
python -m http.server 8080
```
Then open: http://localhost:8080/index.html

## 🎯 Fallback System

If EmailJS fails for any reason, the form automatically:
- Opens your default email client (Gmail, Outlook, etc.)
- Pre-fills the message with all form data
- You'll see a yellow "Email Client Opened" confirmation

## 📧 What You'll Receive

Every submission arrives in `unnatitank14@gmail.com` with:
- Sender's name
- Sender's email (click Reply to respond)
- Their full message
- Sent via EmailJS

## 🚀 When You Deploy

No changes needed! EmailJS works on:
- GitHub Pages
- Vercel
- Netlify
- Any hosting platform

---

**After setup, test immediately by filling your own form! 🎉**

