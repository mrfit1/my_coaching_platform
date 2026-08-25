export const serviceSlugs = [
  'in-home-personal-training-toronto',
  'private-personal-training-toronto',
  'online-fitness-coaching',
  'workout-programming',
  'nutrition-coaching',
  'personal-training-for-beginners-seniors'
] as const;
export type ServiceSlug = typeof serviceSlugs[number];
export const isServiceSlug=(s:string):s is ServiceSlug=>serviceSlugs.includes(s as ServiceSlug);

export const serviceSeo:any={
 en:{
  'in-home-personal-training-toronto':['In-Home Personal Trainer Toronto | Private Home Fitness Coaching','One-to-one in-home personal training in Toronto and selected GTA areas. Personalized strength, fitness and accountability in your home or condo gym.','A private trainer comes to your home or condo gym. Sessions are built around your experience, available equipment, goals and schedule.','Ideal for busy professionals, beginners, parents and anyone who values privacy or convenience.'],
  'private-personal-training-toronto':['Private Personal Trainer Toronto | One-to-One Fitness Coaching','Private personal training in Toronto with individualized sessions, progressive programming and ongoing coaching support.','Train one-to-one with a structured plan and personal coaching focused on technique, progression and consistency.','Your sessions connect directly with the plan, notes and progress tracking in your client dashboard.'],
  'online-fitness-coaching':['Online Fitness Coach Toronto | Personalized Training Programs','Online fitness coaching with personalized workouts, check-ins, progress tracking and flexible support for clients in Toronto and beyond.','Get a training plan that fits your equipment and schedule, then stay accountable through regular check-ins and dashboard tracking.','Online coaching can work on its own or alongside occasional in-person sessions.'],
  'workout-programming':['Personalized Workout Program Toronto | Strength & Fitness Plans','Custom workout programming for strength, fitness, physique and sustainable progress based on your goals, equipment and weekly schedule.','Receive a progressive workout plan designed around what you can realistically do each week.','Programs are reviewed and adjusted as your progress, schedule and training capacity change.'],
  'nutrition-coaching':['Nutrition Coaching Toronto | Practical Fitness Nutrition Support','Practical nutrition coaching in Toronto focused on meal structure, habits and accountability to support training and body-composition goals.','Build practical eating habits that support your training without turning every meal into a complicated project.','This is general fitness nutrition coaching and does not replace medical nutrition therapy or care from a registered health professional.'],
  'personal-training-for-beginners-seniors':['Personal Training for Beginners & Older Adults Toronto','Approachable personal training in Toronto for beginners and active older adults focused on confidence, strength, mobility and consistency.','Start at a level that feels manageable, learn safe movement patterns and progress step by step.','Programming is adapted to current ability and goals; medical clearance may be requested when appropriate.']
 },
 fa:{
  'in-home-personal-training-toronto':['پرسنال ترینر در منزل تورنتو | مربی خصوصی در خانه','پرسنال ترینینگ یک‌به‌یک در منزل یا باشگاه کاندو در تورنتو و برخی مناطق GTA با برنامه متناسب با هدف و سطح شما.','مربی برای جلسه خصوصی به منزل یا باشگاه کاندوی شما می‌آید و تمرین بر اساس امکانات، زمان و هدف شما تنظیم می‌شود.','مناسب برای افراد پرمشغله، مبتدیان و کسانی که راحتی و حریم خصوصی برایشان مهم است.'],
  'private-personal-training-toronto':['مربی خصوصی در تورنتو | پرسنال ترینینگ یک‌به‌یک','تمرین خصوصی یک‌به‌یک در تورنتو همراه با برنامه مرحله‌ای و پیگیری مستمر.','جلسات خصوصی با تمرکز بر تکنیک، پیشرفت و استمرار طراحی می‌شوند.','جلسات با برنامه و ثبت پیشرفت در داشبورد مشتری هماهنگ می‌شوند.'],
  'online-fitness-coaching':['کوچینگ آنلاین فیتنس | برنامه تمرینی آنلاین تورنتو','کوچینگ آنلاین با برنامه شخصی، پیگیری و ثبت پیشرفت برای تورنتو و سایر مناطق.','برنامه‌ای متناسب با تجهیزات و زمان خود دریافت می‌کنید و با چک‌این‌های منظم پیش می‌روید.','کوچینگ آنلاین می‌تواند مستقل یا همراه با جلسات حضوری باشد.'],
  'workout-programming':['برنامه تمرینی شخصی در تورنتو | قدرت و فیتنس','طراحی برنامه تمرینی بر اساس هدف، تجهیزات، زمان هفتگی و سطح آمادگی.','یک برنامه مرحله‌ای و قابل اجرا دریافت می‌کنید که با زندگی واقعی شما هماهنگ است.','با پیشرفت شما برنامه قابل بازبینی و تنظیم است.'],
  'nutrition-coaching':['کوچینگ تغذیه در تورنتو | راهنمایی تغذیه ورزشی','راهنمایی عمومی و کاربردی برای ساختار وعده‌ها، عادت‌ها و حمایت از اهداف ورزشی.','هدف ایجاد عادت‌های قابل اجرا و هماهنگ با تمرین است.','این خدمات جایگزین درمان پزشکی یا خدمات تخصصی تغذیه درمانی نیست.'],
  'personal-training-for-beginners-seniors':['پرسنال ترینینگ مبتدیان و سنین بالاتر در تورنتو','تمرین قابل‌فهم برای مبتدیان و افراد مسن‌تر با تمرکز بر قدرت، تحرک، اعتماد و استمرار.','از سطح مناسب شروع می‌کنید و قدم‌به‌قدم جلو می‌روید.','در صورت نیاز ممکن است پیش از شروع توصیه به تأیید پزشک شود.']
 },
 fr:{},es:{}
};
// Fall back to English for service detail copy until final French/Spanish editorial review.
export function getServiceSeo(lang:string,slug:ServiceSlug){return serviceSeo[lang]?.[slug]||serviceSeo.en[slug]}
