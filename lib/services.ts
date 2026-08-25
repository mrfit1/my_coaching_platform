export const serviceSlugs = [
  'in-home-personal-training-toronto',
  'private-personal-training-toronto',
  'online-fitness-coaching',
  'workout-programming',
  'nutrition-coaching',
  'personal-training-for-beginners-seniors',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const isServiceSlug = (s: string): s is ServiceSlug =>
  serviceSlugs.includes(s as ServiceSlug);

type ServiceSeoEntry = [string, string, string, string];
type ServiceSeoMap = Record<ServiceSlug, ServiceSeoEntry>;

export const serviceSeo: Record<'en' | 'fa' | 'fr' | 'es', ServiceSeoMap> = {
  en: {
    'in-home-personal-training-toronto': [
      'In-Home Personal Trainer Toronto | Private Home Fitness Coaching',
      'One-to-one in-home personal training in Toronto and selected GTA areas. Personalized strength, fitness and accountability in your home or condo gym.',
      'A private trainer comes to your home or condo gym. Sessions are built around your experience, available equipment, goals and schedule.',
      'Ideal for busy professionals, beginners, parents and anyone who values privacy or convenience.',
    ],
    'private-personal-training-toronto': [
      'Private Personal Trainer Toronto | One-to-One Fitness Coaching',
      'Private personal training in Toronto with individualized sessions, progressive programming and ongoing coaching support.',
      'Train one-to-one with a structured plan and personal coaching focused on technique, progression and consistency.',
      'Your sessions connect directly with the plan, notes and progress tracking in your client dashboard.',
    ],
    'online-fitness-coaching': [
      'Online Fitness Coaching Worldwide | Personalized Training Programs',
      'Worldwide online fitness coaching with personalized workouts, check-ins, progress tracking and flexible support wherever you live.',
      'Get a personalized training plan from anywhere in the world, built around your equipment, schedule and goals, with check-ins and dashboard tracking.',
      'Online coaching can work on its own or alongside occasional in-person sessions.',
    ],
    'workout-programming': [
      'Personalized Workout Program Worldwide | Strength & Fitness Plans',
      'Worldwide personalized workout programming for strength, fitness, physique and sustainable progress based on your goals, equipment and weekly schedule.',
      'Receive a progressive workout plan designed around what you can realistically do each week.',
      'Programs are reviewed and adjusted as your progress, schedule and training capacity change.',
    ],
    'nutrition-coaching': [
      'Online Nutrition Coaching Worldwide | Practical Fitness Nutrition Support',
      'Practical online fitness nutrition coaching available worldwide, focused on meal structure, habits and accountability to support training and body-composition goals.',
      'Build practical eating habits that support your training without turning every meal into a complicated project.',
      'This is general fitness nutrition coaching and does not replace medical nutrition therapy or care from a registered health professional.',
    ],
    'personal-training-for-beginners-seniors': [
      'Personal Training for Beginners & Older Adults Toronto',
      'Approachable personal training in Toronto for beginners and active older adults focused on confidence, strength, mobility and consistency.',
      'Start at a level that feels manageable, learn safe movement patterns and progress step by step.',
      'Programming is adapted to current ability and goals; medical clearance may be requested when appropriate.',
    ],
  },
  fa: {
    'in-home-personal-training-toronto': [
      'پرسنال ترینر در منزل تورنتو | مربی خصوصی در خانه',
      'پرسنال ترینینگ یک‌به‌یک در منزل یا باشگاه کاندو در تورنتو و برخی مناطق GTA با برنامه متناسب با هدف و سطح شما.',
      'مربی برای جلسه خصوصی به منزل یا باشگاه کاندوی شما می‌آید و تمرین بر اساس امکانات، زمان و هدف شما تنظیم می‌شود.',
      'مناسب برای افراد پرمشغله، مبتدیان و کسانی که راحتی و حریم خصوصی برایشان مهم است.',
    ],
    'private-personal-training-toronto': [
      'مربی خصوصی در تورنتو | پرسنال ترینینگ یک‌به‌یک',
      'تمرین خصوصی یک‌به‌یک در تورنتو همراه با برنامه مرحله‌ای و پیگیری مستمر.',
      'جلسات خصوصی با تمرکز بر تکنیک، پیشرفت و استمرار طراحی می‌شوند.',
      'جلسات با برنامه و ثبت پیشرفت در داشبورد مشتری هماهنگ می‌شوند.',
    ],
    'online-fitness-coaching': [
      'کوچینگ آنلاین فیتنس جهانی | برنامه تمرینی شخصی',
      'کوچینگ آنلاین با برنامه شخصی، پیگیری و ثبت پیشرفت برای افراد در هر جای دنیا.',
      'از هر جای دنیا برنامه‌ای متناسب با تجهیزات، زمان و هدفتان دریافت می‌کنید و با چک‌این‌های منظم پیش می‌روید.',
      'کوچینگ آنلاین می‌تواند مستقل یا همراه با جلسات حضوری باشد.',
    ],
    'workout-programming': [
      'برنامه تمرینی شخصی آنلاین | قابل دریافت از سراسر دنیا',
      'طراحی برنامه تمرینی آنلاین برای افراد در سراسر دنیا بر اساس هدف، تجهیزات، زمان هفتگی و سطح آمادگی.',
      'یک برنامه مرحله‌ای و قابل اجرا دریافت می‌کنید که با زندگی واقعی شما هماهنگ است.',
      'با پیشرفت شما برنامه قابل بازبینی و تنظیم است.',
    ],
    'nutrition-coaching': [
      'کوچینگ تغذیه آنلاین | قابل دریافت از سراسر دنیا',
      'راهنمایی عمومی و آنلاین تغذیه ورزشی برای افراد در سراسر دنیا، با تمرکز بر ساختار وعده‌ها، عادت‌ها و اهداف فیتنس.',
      'هدف ایجاد عادت‌های قابل اجرا و هماهنگ با تمرین است.',
      'این خدمات جایگزین درمان پزشکی یا خدمات تخصصی تغذیه درمانی نیست.',
    ],
    'personal-training-for-beginners-seniors': [
      'پرسنال ترینینگ مبتدیان و سنین بالاتر در تورنتو',
      'تمرین قابل‌فهم برای مبتدیان و افراد مسن‌تر با تمرکز بر قدرت، تحرک، اعتماد و استمرار.',
      'از سطح مناسب شروع می‌کنید و قدم‌به‌قدم جلو می‌روید.',
      'در صورت نیاز ممکن است پیش از شروع توصیه به تأیید پزشک شود.',
    ],
  },
  fr: {
    'in-home-personal-training-toronto': [
      'Entraîneur personnel à domicile Toronto | Coaching privé',
      'Entraînement individuel à domicile à Toronto et dans certains secteurs du GTA, à la maison ou dans le gym de votre condo.',
      'Un coach se déplace chez vous ou dans le gym de votre condo. Les séances sont adaptées à votre expérience, votre équipement, vos objectifs et votre horaire.',
      'Une option pratique pour les professionnels occupés, les débutants, les parents et toute personne qui préfère plus d’intimité.',
    ],
    'private-personal-training-toronto': [
      'Entraîneur personnel privé Toronto | Coaching individuel',
      'Entraînement personnel privé à Toronto avec séances individualisées, progression structurée et suivi continu.',
      'Entraînez-vous en individuel avec un plan structuré axé sur la technique, la progression et la constance.',
      'Les séances peuvent être reliées à votre plan, vos notes et votre suivi de progression dans le tableau de bord client.',
    ],
    'online-fitness-coaching': [
      'Coach fitness en ligne mondial | Programme personnalisé',
      'Coaching fitness en ligne avec programmes personnalisés, suivis et progression pour des clients partout dans le monde.',
      'Depuis n’importe où dans le monde, recevez un programme adapté à votre équipement, votre horaire et vos objectifs avec suivi dans le tableau de bord.',
      'Le coaching en ligne peut être utilisé seul ou combiné à des séances en personne.',
    ],
    'workout-programming': [
      'Programme d’entraînement personnalisé en ligne | Monde entier',
      'Programme personnalisé disponible partout dans le monde pour la force, le fitness, la composition corporelle et une progression durable.',
      'Recevez un plan progressif conçu autour de ce que vous pouvez réellement faire chaque semaine.',
      'Le programme peut être révisé à mesure que votre progression, votre emploi du temps et vos capacités évoluent.',
    ],
    'nutrition-coaching': [
      'Coaching nutrition fitness en ligne | Monde entier',
      'Coaching nutritionnel fitness en ligne disponible partout dans le monde, axé sur la structure des repas, les habitudes et la constance.',
      'Développez des habitudes alimentaires réalistes qui soutiennent votre entraînement sans compliquer chaque repas.',
      'Ce service est un accompagnement général en nutrition sportive et ne remplace pas les soins médicaux ni la nutrition thérapeutique.',
    ],
    'personal-training-for-beginners-seniors': [
      'Entraînement personnel débutants & adultes plus âgés Toronto',
      'Coaching accessible à Toronto pour débutants et adultes actifs plus âgés, axé sur la force, la mobilité, la confiance et la constance.',
      'Commencez à un niveau adapté, apprenez des mouvements sécuritaires et progressez étape par étape.',
      'Le programme est adapté aux capacités et objectifs actuels; une autorisation médicale peut être recommandée lorsque nécessaire.',
    ],
  },
  es: {
    'in-home-personal-training-toronto': [
      'Entrenador personal a domicilio Toronto | Coaching privado',
      'Entrenamiento individual a domicilio en Toronto y zonas seleccionadas del GTA, en casa o en el gimnasio de tu condominio.',
      'Un entrenador se desplaza a tu casa o gimnasio del condominio. Las sesiones se adaptan a tu experiencia, equipo, objetivos y horario.',
      'Ideal para profesionales ocupados, principiantes, padres y personas que valoran la privacidad y la comodidad.',
    ],
    'private-personal-training-toronto': [
      'Entrenador personal privado Toronto | Coaching individual',
      'Entrenamiento personal privado en Toronto con sesiones individualizadas, programación progresiva y seguimiento continuo.',
      'Entrena uno a uno con un plan estructurado centrado en técnica, progresión y constancia.',
      'Las sesiones pueden conectarse con tu plan, notas y seguimiento de progreso dentro del panel del cliente.',
    ],
    'online-fitness-coaching': [
      'Coach fitness online mundial | Programa personalizado',
      'Coaching fitness online con programas personalizados, seguimiento y progreso para clientes en cualquier parte del mundo.',
      'Desde cualquier parte del mundo, recibe un plan adaptado a tu equipo, horario y objetivos con seguimiento en el panel.',
      'El coaching online puede funcionar solo o combinarse con sesiones presenciales ocasionales.',
    ],
    'workout-programming': [
      'Programa de entrenamiento personalizado online | Todo el mundo',
      'Programación personalizada disponible en todo el mundo para fuerza, fitness, físico y progreso sostenible según tus objetivos y equipo.',
      'Recibe un plan progresivo diseñado alrededor de lo que realmente puedes hacer cada semana.',
      'El programa se revisa y ajusta a medida que cambian tu progreso, horario y capacidad de entrenamiento.',
    ],
    'nutrition-coaching': [
      'Coaching nutricional Toronto | Apoyo para objetivos fitness',
      'Coaching nutricional práctico en Toronto centrado en estructura de comidas, hábitos y constancia para apoyar tus objetivos deportivos.',
      'Crea hábitos de alimentación realistas que apoyen tu entrenamiento sin complicar cada comida.',
      'Este servicio ofrece orientación general de nutrición para fitness y no sustituye atención médica ni terapia nutricional clínica.',
    ],
    'personal-training-for-beginners-seniors': [
      'Entrenamiento personal para principiantes y adultos mayores Toronto',
      'Entrenamiento accesible en Toronto para principiantes y adultos mayores activos, centrado en fuerza, movilidad, confianza y constancia.',
      'Empieza en un nivel manejable, aprende patrones de movimiento seguros y progresa paso a paso.',
      'La programación se adapta a tu capacidad y objetivos actuales; cuando corresponda, puede recomendarse autorización médica.',
    ],
  },
};

export function getServiceSeo(lang: string, slug: ServiceSlug): ServiceSeoEntry {
  const locale = lang === 'fa' || lang === 'fr' || lang === 'es' ? lang : 'en';
  return serviceSeo[locale][slug];
}
