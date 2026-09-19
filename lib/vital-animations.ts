const VITAL_BY_NAME: Record<string, string> = {
  "pec deck machine fly": "0051",
  "svend press chest": "0052",
  "air bike sprint": "0053",
  "barbell back squat": "0054",
  "barbell bulgarian split squat": "0055",
  "barbell front squat": "0056",
  "barbell hip thrust": "0057",
  "barbell march": "0058",
  "barbell reverse lunges": "0059",
  "barbell romanian deadlift": "0060",
  "cable leg kickback": "0061",
  "cycling": "0062",
  "dumbbell bulgarian split squat": "0063",
  "dumbbell goblet squat": "0064",
  "dumbbell hip hinge": "0065",
  "dumbbell jump squat": "0066",
  "elliptical hiit machine": "0067",
  "hack squat machine": "0068",
  "hip abduction machine": "0069",
  "kettlebell hold march": "0070",
  "kettlebell lift up": "0071",
  "kettlebell swing": "0072",
  "leg extension machine": "0073",
  "leg press machine": "0074",
  "lying leg curl machine": "0075",
  "rope wave": "0076",
  "rowing machine": "0077",
  "run on treadmill": "0078",
  "seated leg curl machine": "0079",
  "seated overhead press": "0080",
  "step-ups (weighted)": "0081",
  "stepmill machine version 1": "0082",
  "stepmill machine": "0083",
  "stiff-legged deadlift machine": "0084",
  "triceps pushdown (cable - rope)": "0085",
  "walk on treadmill": "0086",
  "arnold press dumbbell": "0087",
  "barbell overhead press standing": "0088",
  "barbell upright row": "0089",
  "dumbbell overhead standard": "0090",
  "dumbbell upright row": "0091",
  "front raise (dumbbell)": "0092",
  "front raise (weighted plate)": "0093",
  "kettlebell overhead press": "0094",
  "cable cross lateral raise": "0095",
  "lateral raises (dumbbell)": "0096",
  "lateral raise machine": "0097",
  "military press (seated - smith machine)": "0098",
  "rear delt fly (reverse pec deck)": "0099",
  "rear delt cable fly": "0100",
};

function normalizeExerciseName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function vitalAnimationUrl(exerciseName: string) {
  const normalized = normalizeExerciseName(exerciseName);
  const direct = VITAL_BY_NAME[normalized];
  if (direct) return `/exercises/vital/${direct}.mp4`;

  // Allow harmless punctuation/wording differences in the exercise dataset.
  const match = Object.entries(VITAL_BY_NAME).find(([name]) =>
    normalized === name || normalized.includes(name) || name.includes(normalized)
  );
  return match ? `/exercises/vital/${match[1]}.mp4` : null;
}
