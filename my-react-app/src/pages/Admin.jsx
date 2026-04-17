import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Save, Image, Link as LinkIcon, Users, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const SECTIONS = [
  {
    key: 'hero',
    label: 'Hero Section',
    icon: Image,
    fields: [
      { name: 'slide1', label: 'Slide 1 Image URL', type: 'url' },
      { name: 'slide2', label: 'Slide 2 Image URL', type: 'url' },
      { name: 'slide3', label: 'Slide 3 Image URL', type: 'url' },
      { name: 'slide4', label: 'Slide 4 Image URL', type: 'url' },
    ],
  },
  {
    key: 'about',
    label: 'About Page',
    icon: Users,
    fields: [
      { name: 'heroImage', label: 'Hero Banner Image URL', type: 'url' },
      { name: 'collageTop', label: 'Collage Top Image URL', type: 'url' },
      { name: 'collageBottomLeft', label: 'Collage Bottom-Left Image URL', type: 'url' },
      { name: 'collageBottomRight', label: 'Collage Bottom-Right Image URL', type: 'url' },
      { name: 'storyTitle', label: 'Story Title', type: 'text' },
      { name: 'storyText1', label: 'Story Paragraph 1', type: 'textarea' },
      { name: 'storyText2', label: 'Story Paragraph 2', type: 'textarea' },
    ],
  },
  {
    key: 'team',
    label: 'Team Members',
    icon: Users,
    fields: [
      { name: 'member1Name', label: 'Member 1 Name', type: 'text' },
      { name: 'member1Role', label: 'Member 1 Role', type: 'text' },
      { name: 'member1Bio', label: 'Member 1 Bio', type: 'textarea' },
      { name: 'member1Image', label: 'Member 1 Image URL', type: 'url' },
      { name: 'member1Specialty', label: 'Member 1 Specialty', type: 'text' },
      { name: 'member2Name', label: 'Member 2 Name', type: 'text' },
      { name: 'member2Role', label: 'Member 2 Role', type: 'text' },
      { name: 'member2Bio', label: 'Member 2 Bio', type: 'textarea' },
      { name: 'member2Image', label: 'Member 2 Image URL', type: 'url' },
      { name: 'member2Specialty', label: 'Member 2 Specialty', type: 'text' },
      { name: 'member3Name', label: 'Member 3 Name', type: 'text' },
      { name: 'member3Role', label: 'Member 3 Role', type: 'text' },
      { name: 'member3Bio', label: 'Member 3 Bio', type: 'textarea' },
      { name: 'member3Image', label: 'Member 3 Image URL', type: 'url' },
      { name: 'member3Specialty', label: 'Member 3 Specialty', type: 'text' },
      { name: 'member4Name', label: 'Member 4 Name', type: 'text' },
      { name: 'member4Role', label: 'Member 4 Role', type: 'text' },
      { name: 'member4Bio', label: 'Member 4 Bio', type: 'textarea' },
      { name: 'member4Image', label: 'Member 4 Image URL', type: 'url' },
      { name: 'member4Specialty', label: 'Member 4 Specialty', type: 'text' },
    ],
  },
  {
    key: 'gallery',
    label: 'Gallery Images',
    icon: Image,
    fields: [
      { name: 'img1', label: 'Gallery Image 1 URL', type: 'url' },
      { name: 'img2', label: 'Gallery Image 2 URL', type: 'url' },
      { name: 'img3', label: 'Gallery Image 3 URL', type: 'url' },
      { name: 'img4', label: 'Gallery Image 4 URL', type: 'url' },
      { name: 'img5', label: 'Gallery Image 5 URL', type: 'url' },
      { name: 'img6', label: 'Gallery Image 6 URL', type: 'url' },
    ],
  },
  {
    key: 'social',
    label: 'Social Media Links',
    icon: LinkIcon,
    fields: [
      { name: 'instagram', label: 'Instagram URL', type: 'url' },
      { name: 'pinterest', label: 'Pinterest URL', type: 'url' },
      { name: 'youtube', label: 'YouTube URL', type: 'url' },
    ],
  },
];

function SectionPanel({ section, allSettings, onSaved }) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = allSettings.find(s => s.key === section.key);
    if (existing?.value) setValues(existing.value);
  }, [allSettings, section.key]);

  const handleSave = async () => {
    setSaving(true);
    const existing = allSettings.find(s => s.key === section.key);
    if (existing) {
      await base44.entities.SiteSettings.update(existing.id, { value: values });
    } else {
      await base44.entities.SiteSettings.create({ key: section.key, value: values });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onSaved();
  };

  const Icon = section.icon;

  return (
    <div className="border border-foreground/10 bg-white">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-foreground/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm tracking-[0.1em] uppercase font-medium">{section.label}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6 border-t border-foreground/5"
        >
          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            {section.fields.map(field => (
              <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={values[field.name] || ''}
                    onChange={e => setValues(v => ({ ...v, [field.name]: e.target.value }))}
                    className="w-full border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                    placeholder={field.label}
                  />
                ) : (
                  <input
                    type="text"
                    value={values[field.name] || ''}
                    onChange={e => setValues(v => ({ ...v, [field.name]: e.target.value }))}
                    className="w-full border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                    placeholder={field.type === 'url' ? 'https://...' : field.label}
                  />
                )}
                {field.type === 'url' && values[field.name] && (
                  <img
                    src={values[field.name]}
                    alt="preview"
                    onError={e => e.target.style.display = 'none'}
                    className="mt-2 h-20 w-full object-cover grayscale opacity-60"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-foreground text-background text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function Admin() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    const data = await base44.entities.SiteSettings.list();
    setSettings(data);
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-foreground/10 px-6 lg:px-12 py-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground block mb-1">Eternal</span>
          <h1 className="font-heading text-2xl italic">Admin Portal</h1>
        </div>
        <a href="/" className="text-xs tracking-[0.2em] uppercase border-b border-foreground/20 pb-0.5 hover:border-foreground transition-colors">
          View Site
        </a>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-xs text-muted-foreground tracking-wide mb-8">
          Manage images, text, and social links across your website. Changes are saved per section.
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {SECTIONS.map(section => (
              <SectionPanel
                key={section.key}
                section={section}
                allSettings={settings}
                onSaved={fetchSettings}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}