import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from './projects.types';
import { Button } from '../../components/ui/Button';

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div className="absolute inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <div className="absolute inset-0 backdrop-blur-[6px]" />

          <motion.div
            className="
              relative w-full max-w-2xl overflow-hidden rounded-3xl
              border border-slate-200/60 dark:border-white/10
              bg-white/80 dark:bg-[#0B1020]/85
              shadow-[0_40px_140px_rgba(0,0,0,0.55)]
            "
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 520, damping: 38 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="relative h-24">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(245,158,11,0.20),transparent_58%),radial-gradient(circle_at_76%_40%,rgba(45,212,191,0.10),transparent_60%),radial-gradient(circle_at_55%_0%,rgba(250,204,21,0.12),transparent_62%)] dark:bg-[radial-gradient(circle_at_18%_35%,rgba(245,158,11,0.14),transparent_58%),radial-gradient(circle_at_76%_40%,rgba(45,212,191,0.08),transparent_60%),radial-gradient(circle_at_55%_0%,rgba(250,204,21,0.10),transparent_62%)]" />

              <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.10] [background-image:linear-gradient(to_right,rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.45)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(241,245,249,0.40)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,245,249,0.40)_1px,transparent_1px)] [background-size:26px_26px]" />
            </div>

            <motion.div
              className="p-6 pt-5"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.06 } },
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{project.role}</p>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                  Close
                </Button>
              </motion.div>

              <motion.p variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="mt-4 text-slate-700 dark:text-slate-200 leading-relaxed">
                {project.description}
              </motion.p>

              <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="mt-6">
                <h4 className="font-semibold">Highlights</h4>
                <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-200">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="mt-7 flex flex-wrap gap-3">
                {project.links.live ? (
                  <Button as="a" href={project.links.live} target="_blank" rel="noreferrer" size="md">
                    Live Demo
                  </Button>
                ) : null}
                {project.links.github ? (
                  <Button as="a" href={project.links.github} target="_blank" rel="noreferrer" variant="ghost" size="md">
                    GitHub
                  </Button>
                ) : null}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
