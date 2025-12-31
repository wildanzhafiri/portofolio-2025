import { Section } from '../../components/layouts/Section';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactValues } from './contact.schema';
import { Reveal } from '../../components/ui/Reveal';
import { Button } from '../../components/ui/Button';

const WHATSAPP_NUMBER = '6281233456496';
const EMAIL_TO = 'wildanzhaf@gmail.com';

export function Contact() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
    mode: 'onBlur',
  });

  const buildWhatsAppText = (v: ContactValues) => {
    return `Hi, I'm ${v.name}\nEmail: ${v.email}\n\n${v.message}`;
  };

  const buildEmailBody = (v: ContactValues) => {
    return `Hi, I'm ${v.name}\n\n${v.message}`;
  };

  const sendWhatsApp = (v: ContactValues) => {
    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppText(v))}`;
    window.open(wa, '_blank', 'noreferrer');
  };

  const sendEmail = (v: ContactValues) => {
    const subject = `New message from ${v.name}`;
    const mailto = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildEmailBody(v))}`;
    window.location.href = mailto;
  };

  return (
    <Section id="contact" title="Contact" subtitle="Let's build something great.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-3xl border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6">
            <h3 className="font-semibold">Social</h3>
            <div className="mt-4 space-y-2 text-slate-700 dark:text-slate-200">
              <a className="block hover:text-orange-500 transition" href="https://github.com/wildanzhafiri" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="block hover:text-orange-500 transition" href="https://www.linkedin.com/in/muhammad-wildan-zhafiri-0a1921289/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="block hover:text-orange-500 transition" href="https://www.instagram.com/wildanzhf/" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="block hover:text-orange-500 transition" href={`mailto:${EMAIL_TO}`}>
                Email
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <form onSubmit={(e) => e.preventDefault()} className="rounded-3xl border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input className="mt-2 w-full rounded-2xl bg-slate-900/5 dark:bg-white/10 px-4 py-3 outline-none" {...form.register('name')} />
              {form.formState.errors.name?.message ? <p className="mt-1 text-xs text-rose-500">{form.formState.errors.name.message}</p> : null}
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input className="mt-2 w-full rounded-2xl bg-slate-900/5 dark:bg-white/10 px-4 py-3 outline-none" {...form.register('email')} />
              {form.formState.errors.email?.message ? <p className="mt-1 text-xs text-rose-500">{form.formState.errors.email.message}</p> : null}
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea rows={5} className="mt-2 w-full rounded-2xl bg-slate-900/5 dark:bg-white/10 px-4 py-3 outline-none resize-none" {...form.register('message')} />
              {form.formState.errors.message?.message ? <p className="mt-1 text-xs text-rose-500">{form.formState.errors.message.message}</p> : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="button" onClick={form.handleSubmit(sendWhatsApp)} className="w-full cursor-pointer hover:scale-105 transition ease-in-out">
                Send via WhatsApp
              </Button>

              <Button type="button" onClick={form.handleSubmit(sendEmail)} className="w-full cursor-pointer hover:scale-105 transition ease-in-out">
                Send via Email
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
