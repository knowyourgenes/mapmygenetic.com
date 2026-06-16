/**
 * Single source of truth for the MapMyGenetic content that gets pushed into
 * Sanity by `pnpm seed`. The homepage renders entirely from Sanity; nothing
 * here is hard-coded into the React components.
 */

// A paragraph is a list of inline segments. A plain string is normal text;
// `{ b }` marks a bold run. The seed script converts these into portable-text.
export type Segment = string | { b: string };
export type Paragraph = Segment[];

export const homepageContent = {
  brandName: "MapMyGenetic",
  brandTld: ".com",
  navLinks: [
    { label: "Browse", anchor: "#categories" },
    { label: "Q&A Library", anchor: "#faq" },
    { label: "Our Standards", anchor: "#standards" },
  ],
  navCtaLabel: "Weekly digest",
  navCtaAnchor: "#newsletter",

  heroEyebrow: "An open library of answers about your DNA",
  heroHeadline: "Genetics, answered",
  heroHeadlineAccent: "plainly.",
  heroSubhead:
    "Honest, cited, jargon-free answers to the questions people actually ask about genetic testing, inheritance, ancestry, and disease risk. Reviewed by clinicians. Updated as the science updates.",
  heroPrimaryCtaLabel: "Browse all questions",
  heroPrimaryCtaAnchor: "#faq",
  heroSecondaryCtaLabel: "Browse by category",
  heroSecondaryCtaAnchor: "#categories",
  searchPlaceholder:
    "Try: 'Can a DNA test predict diabetes?' · 'What does BRCA1 mean?'",
  searchPills: [
    { label: "Is height genetic?", tag: "Is height genetic?" },
    { label: "What is a SNP?", tag: "What is a SNP?" },
    { label: "BRCA1 explained", tag: "BRCA1" },
    { label: "Carrier screening", tag: "carrier" },
    { label: "Ancestry results", tag: "ancestry" },
  ],

  stats: [
    { label: "Answered questions", source: "questions" as const },
    { label: "Topic categories", source: "categories" as const },
    { label: "Clinician reviewers", source: "reviewers" as const },
    { label: "Free, always", source: "custom" as const, customValue: "∞" },
  ],

  categoriesLabel: "Topic categories",
  categoriesTitle: "Browse",
  categoriesTitleAccent: "by subject",
  allQuestionsLabel: "All questions",
  faqTitle: "Answered questions",

  standardsLabel: "How we write these answers",
  standardsHeadline: "Plain science,",
  standardsHeadlineAccent: "honestly held.",
  standardsBody:
    "Every answer on this site is researched against peer-reviewed sources, drafted by our editorial team, and reviewed by a board-certified clinician or genetic counsellor before publishing. We cite sources in the answer itself, not in hidden footnotes. We update answers when the science updates - the date of last review appears under each question. We say 'we don't know yet' when that is the honest answer.",
  pillars: [
    {
      num: "01",
      title: "Peer-reviewed sources only",
      text: "Every factual claim is traced to a published study or authoritative clinical guideline. Speculation is labelled as such.",
    },
    {
      num: "02",
      title: "Clinician review before publish",
      text: "No answer goes live without sign-off from a board-certified clinician or genetic counsellor with relevant specialty.",
    },
    {
      num: "03",
      title: "Updated as science updates",
      text: "The last-reviewed date under each Q&A is real. When evidence changes, the answer changes. We don't leave stale copy up.",
    },
    {
      num: "04",
      title: "We say 'we don't know yet'",
      text: "Genetics is fast-moving. Some questions don't have settled answers yet. We say so plainly, rather than manufacturing false certainty.",
    },
  ],

  newsletterHeadline: "One answered question,",
  newsletterHeadlineAccent: "every Friday.",
  newsletterSubhead:
    "Five-minute reads on the genetics questions readers asked us this week. Plus a short note on any new science that changes an old answer. In your inbox.",
  newsletterPlaceholder: "your@email.com",
  newsletterButton: "Subscribe",
  newsletterNote: "No spam. No affiliate links. Unsubscribe any time.",

  footerLinks: [
    { label: "About", anchor: "#" },
    { label: "Editorial standards", anchor: "#" },
    { label: "Privacy", anchor: "#" },
    { label: "Ask a question", anchor: "#" },
  ],
  footerCopy: "Plain-language genetics · Free for everyone",
};

export const categories = [
  { slug: "basics", title: "Testing basics", order: 1 },
  { slug: "dna", title: "How DNA works", order: 2 },
  { slug: "inheritance", title: "Inheritance & family", order: 3 },
  { slug: "ancestry", title: "Ancestry", order: 4 },
  { slug: "health", title: "Health & disease risk", order: 5 },
  { slug: "traits", title: "Traits & lifestyle", order: 6 },
  { slug: "pregnancy", title: "Children & pregnancy", order: 7 },
  { slug: "ethics", title: "Ethics, privacy & law", order: 8 },
];

export const reviewers = [
  {
    slug: "vikram-k",
    name: "Dr. Vikram K.",
    title: "medical geneticist",
    order: 1,
  },
  {
    slug: "riya-m",
    name: "Dr. Riya M.",
    title: "clinical geneticist",
    order: 2,
  },
  {
    slug: "manas-k",
    name: "Dr. Manas K.",
    title: "molecular biologist",
    order: 3,
  },
  {
    slug: "aruna-g",
    name: "Dr. Aruna G.",
    title: "preventive medicine",
    order: 4,
  },
  {
    slug: "sneha-k",
    name: "Dr. Sneha K.",
    title: "sleep researcher",
    order: 5,
  },
];

export type SeedQuestion = {
  slug: string;
  question: string;
  categorySlug: string;
  reviewerSlug: string;
  tags: string[];
  answer: Paragraph[];
  order: number;
};

export const questions: SeedQuestion[] = [
  {
    slug: "what-does-a-dna-test-tell-me",
    question: "What does a DNA test actually tell me?",
    categorySlug: "basics",
    reviewerSlug: "vikram-k",
    tags: ["DNA", "test", "tell", "me", "basics"],
    order: 1,
    answer: [
      [
        'A DNA test reads specific regions of your genetic code and reports what it finds. The honest answer to "what does it tell me" depends entirely on which test you ordered. There are three broad categories.',
      ],
      [
        { b: "Clinical diagnostic tests" },
        " are ordered by a doctor when they suspect a specific genetic condition. These read the genes most likely to be involved and return a yes-or-no answer with high confidence. BRCA1/BRCA2 testing for breast cancer risk is the best-known example.",
      ],
      [
        { b: "Direct-to-consumer health tests" },
        " - the kind you order online - usually read a few hundred thousand single-letter variants in your DNA. They estimate your risk for common conditions like type 2 diabetes or hypertension, your likely response to caffeine or lactose, and traits like sleep type or muscle composition. These are useful for context, not diagnosis.",
      ],
      [
        { b: "Ancestry tests" },
        " read a different set of variants and compare your pattern to reference populations to estimate where your DNA's signal traces back to. These are estimates, not certainties.",
      ],
      [
        "The key thing to remember: a DNA test reports likelihoods and patterns, not destinies.",
      ],
    ],
  },
  {
    slug: "clinical-vs-direct-to-consumer-test",
    question:
      "What's the difference between a clinical genetic test and a direct-to-consumer one?",
    categorySlug: "basics",
    reviewerSlug: "riya-m",
    tags: ["clinical", "DTC", "direct", "consumer", "difference"],
    order: 2,
    answer: [
      [
        "The difference matters more than most people realise. The two products look similar - you provide a saliva or blood sample and get a report - but they are built for different jobs.",
      ],
      [
        "A clinical genetic test, ordered through a doctor or genetic counsellor, sequences the full gene or full set of genes relevant to a specific medical question. It is validated to clinical-grade standards. A positive result is medically actionable, often immediately. These tests cost more, take longer, and the results come with a clinician's interpretation.",
      ],
      [
        'A direct-to-consumer test, ordered online, typically uses a SNP array - a chip that reads several hundred thousand pre-selected variants out of your roughly three billion DNA base pairs. The coverage is broad but shallow. A DTC result that flags a "moderate risk" for a condition is interesting, but most clinicians would re-test with a proper clinical panel before acting on it.',
      ],
      [
        "The simplest rule of thumb: if the result of a test could change a medical decision, use a clinical test. If you want general lifestyle and wellness context, a DTC test is fine.",
      ],
    ],
  },
  {
    slug: "dna-genes-chromosomes-genome-difference",
    question:
      "What's the difference between DNA, genes, chromosomes, and the genome?",
    categorySlug: "dna",
    reviewerSlug: "manas-k",
    tags: ["DNA", "gene", "chromosome", "genome", "difference"],
    order: 3,
    answer: [
      [
        "These four terms get used interchangeably, but they are nested inside one another.",
      ],
      [
        { b: "DNA" },
        " is the molecule. A long chemical chain made of four building blocks (A, T, G, C) twisted into a double helix. Every cell in your body contains the same DNA.",
      ],
      [
        { b: "A gene" },
        " is a stretch of DNA that codes for a specific function - usually instructions for making a protein. Humans have approximately 20,000 protein-coding genes, which is fewer than the number of genes in a banana. Most of your DNA does not code for proteins; it does other regulatory work, or it doesn't yet have a known function.",
      ],
      [
        { b: "A chromosome" },
        " is the package the DNA is stored in. Humans have 23 pairs of chromosomes (46 in total) - you get one of each pair from each parent. Each chromosome carries hundreds to thousands of genes.",
      ],
      [
        { b: "The genome" },
        ' is the complete set of DNA in your cells - all 23 chromosome pairs together, all 20,000 genes, all the non-coding regions, the lot. When someone says "your genome was sequenced," they mean the full set was read end to end.',
      ],
    ],
  },
  {
    slug: "what-is-a-snp",
    question: "What is a SNP, and why does everyone keep mentioning them?",
    categorySlug: "dna",
    reviewerSlug: "manas-k",
    tags: ["SNP", "snip", "polymorphism", "variant"],
    order: 4,
    answer: [
      [
        'A SNP - pronounced "snip" - stands for single nucleotide polymorphism. It is a position in your DNA where one of the four letters differs from the version most other people carry.',
      ],
      [
        "The reason SNPs come up so often in genetics is that they are easy to read at scale and many of them have been studied for their associations with health, traits, and ancestry. A typical direct-to-consumer DNA test reads between 600,000 and a million SNPs.",
      ],
      [
        "Not every SNP matters. Most are silent variation. The famous ones - APOE for Alzheimer's, BRCA1/2 for breast cancer, CYP1A2 for caffeine, LCT for lactose - matter because the science has caught up to them.",
      ],
    ],
  },
  {
    slug: "50-percent-dna-from-each-parent",
    question: "Do I really get exactly 50% of my DNA from each parent?",
    categorySlug: "inheritance",
    reviewerSlug: "riya-m",
    tags: ["50%", "parents", "inherit", "nuclear", "mitochondrial"],
    order: 5,
    answer: [
      [
        "Yes, but with an asterisk worth understanding. You inherit one copy of each of your 23 chromosomes from each biological parent. That gives you 50% of your nuclear DNA from your mother and 50% from your father. This part is true at the moment of conception and stays true for the rest of your life.",
      ],
      [
        "The asterisk: you also inherit mitochondrial DNA, a small, separate genome that lives inside the mitochondria (the energy producers in your cells). Mitochondrial DNA is passed down only through the maternal line. So if you count mitochondrial DNA in the total, you get marginally more DNA from your mother than from your father - but the difference is tiny, because mitochondrial DNA is only about 16,000 base pairs out of your roughly three billion.",
      ],
      [
        "The harder, more interesting question is which 50% you got from each parent. That part is random. Your siblings got a different random draw. This is why siblings share about 50% of their DNA with each other on average, but the exact figure varies.",
      ],
    ],
  },
  {
    slug: "why-siblings-look-different",
    question:
      "Why do siblings look different even though they share the same parents?",
    categorySlug: "inheritance",
    reviewerSlug: "riya-m",
    tags: ["siblings", "different", "look", "meiosis", "recombination"],
    order: 6,
    answer: [
      [
        "Because the inheritance process is genuinely random within each pregnancy. Each of your parents has two copies of every chromosome - one inherited from their mother, one from their father. When their bodies make eggs and sperm, the cells go through a process called meiosis, which shuffles those two copies and produces a sex cell with just one chromosome from each pair. Which copy ends up in any given egg or sperm is random, and there is also some physical swapping of DNA segments between paired chromosomes - a process called recombination.",
      ],
      [
        "The result: every egg and every sperm carries a slightly different combination of the parent's DNA. When egg meets sperm, you get a child who is 50% from each parent - but a different 50% than the next child will get. This is why two biological siblings share, on average, 50% of their DNA, but the actual figure ranges from roughly 38% to 61% in practice.",
      ],
    ],
  },
  {
    slug: "inherit-condition-neither-parent-has",
    question: "Can I inherit a condition that neither of my parents has?",
    categorySlug: "inheritance",
    reviewerSlug: "vikram-k",
    tags: [
      "inherit",
      "condition",
      "parents",
      "no",
      "family",
      "history",
      "recessive",
      "mutation",
    ],
    order: 7,
    answer: [
      [
        "Yes, this happens in two main ways. First, ",
        { b: "recessive inheritance" },
        ". Many genetic conditions only show up when a person inherits two copies of the variant - one from each parent. If both your parents are carriers of a single copy each, neither will have the condition themselves, but each pregnancy has a one-in-four chance of producing a child who inherits both copies. Cystic fibrosis, sickle cell disease, and several other conditions follow this pattern.",
      ],
      [
        "Second, ",
        { b: "new mutations" },
        ". Roughly 60 to 70 new genetic mutations appear in every newborn that were not present in either parent - small copying errors made when sperm and egg cells were being produced. Most are harmless. A small fraction cause genetic conditions. Achondroplasia (the most common form of inherited dwarfism) is famously caused by a new mutation in about 80% of cases.",
      ],
      [
        'This is one of the reasons "no family history" doesn\'t always mean "no risk."',
      ],
    ],
  },
  {
    slug: "twins-different-ancestry-results",
    question: "Why do twin sisters sometimes get different ancestry results?",
    categorySlug: "ancestry",
    reviewerSlug: "vikram-k",
    tags: ["twin", "sisters", "different", "ancestry", "results", "estimates"],
    order: 8,
    answer: [
      [
        "If they are identical twins, they shouldn't. The fact that they sometimes do tells you something important about how ancestry tests actually work. Identical twins share essentially 100% of their DNA. Any difference in their ancestry results is not a difference in their biology - it is a difference in how the test was processed.",
      ],
      [
        "The reason this happens: ancestry estimates are statistical inferences, not direct readings. The test compares your SNP pattern to reference populations and runs probability calculations. Small random variation in how a sample is processed, batched, and statistically modelled can produce slightly different inferences from the same DNA - especially at the edges, where two ancestry regions overlap.",
      ],
      [
        "Two takeaways: the percentages are estimates with confidence intervals, not facts. And different companies use different reference panels, which is why the same person can look 30% Italian on one site and 18% Italian on another.",
      ],
    ],
  },
  {
    slug: "ancestry-report-changed",
    question: "How can my ancestry report change when I haven't done anything?",
    categorySlug: "ancestry",
    reviewerSlug: "manas-k",
    tags: ["ancestry", "results", "changed", "update", "reference", "panel"],
    order: 9,
    answer: [
      [
        "Your DNA hasn't changed. The reference panel has. Ancestry companies estimate your background by comparing your DNA pattern to large databases of people with known origins. As more people from underrepresented regions add their data, the reference populations get larger and more granular, and the company's algorithms get retrained.",
      ],
      [
        'For South Asian users, this matters more than for European users. The reference databases were historically dominated by people of European descent. Indian, Pakistani, Bangladeshi, Sri Lankan, and Nepali samples were underrepresented until quite recently. As that gap closes, South Asian results are getting noticeably more specific - a result that just said "South Asian" in 2019 might now say "Punjabi" or "Bengali" or "Sinhalese."',
      ],
      [
        "If your results changed and you want to understand why, almost every major ancestry company publishes change-log notes when they update their reference panel. Worth looking up.",
      ],
    ],
  },
  {
    slug: "ancestry-prove-biological-relatives",
    question: "Can an ancestry test prove who my biological relatives are?",
    categorySlug: "ancestry",
    reviewerSlug: "riya-m",
    tags: ["ancestry", "prove", "relatives", "DNA", "matching", "cousins"],
    order: 10,
    answer: [
      [
        "For close relatives, yes, with high confidence. For distant ones, less so. When you upload your DNA to an ancestry service that offers relative matching, the algorithm searches its database for other users who share long, continuous stretches of identical DNA with you.",
      ],
      [
        "For first-degree relatives - parent, child, full sibling - DNA matching is essentially conclusive. For second-degree relatives (half-siblings, grandparents, aunts and uncles) and third-degree relatives (first cousins), the match is still strong, though identifying which specific relationship can sometimes require additional information.",
      ],
      [
        "Beyond that - third cousins, fourth cousins, anyone sharing less than about 1% DNA - the prediction is statistical. These tests have changed adoption searches, donor-conceived families, and law enforcement (the Golden State Killer case). They have also produced thousands of surprise discoveries - unexpected half-siblings, undisclosed parentage, family secrets surfaced. Worth being prepared for what you might find.",
      ],
    ],
  },
  {
    slug: "higher-risk-disease-meaning",
    question:
      "If a test says I have a 'higher risk' for a disease, does that mean I'll get it?",
    categorySlug: "health",
    reviewerSlug: "aruna-g",
    tags: ["higher", "risk", "disease", "destiny", "polygenic", "score"],
    order: 11,
    answer: [
      [
        "No. Higher risk is not destiny - but the test result is also not nothing. Most direct-to-consumer health reports use a polygenic risk score, which adds up the small effects of many genetic variants to estimate your risk relative to an average person.",
      ],
      [
        'What changes the number significantly is what you do with it. Type 2 diabetes risk responds strongly to weight, diet, sleep, and exercise. Cardiovascular risk responds to lipid management, blood pressure control, and lifestyle. A person with a "high genetic risk" who manages those factors can have a lower real-world risk than a person with "average genetic risk" who ignores them.',
      ],
      [
        "The honest framing: a higher genetic risk score is a reason to pay more attention, not a sentence.",
      ],
    ],
  },
  {
    slug: "what-is-a-genetic-carrier",
    question: "What does it mean to be a 'carrier' of a genetic condition?",
    categorySlug: "health",
    reviewerSlug: "riya-m",
    tags: [
      "carrier",
      "genetic",
      "condition",
      "recessive",
      "cystic",
      "fibrosis",
    ],
    order: 12,
    answer: [
      [
        "It means you have one copy of a genetic variant that, if you had two copies, would cause a condition - but because you only have one, you are usually healthy. Most carrier conditions are recessive, meaning they only manifest when both copies of a gene are affected.",
      ],
      [
        "Where carrier status matters is when carriers have children together. If both parents are carriers of the same recessive condition, each pregnancy has a one-in-four chance of producing a child with two affected copies and the condition itself.",
      ],
      [
        "Some specific carrier rates are well-documented - about 1 in 25 people of European descent carry a cystic fibrosis variant, about 1 in 12 South Asians carry a beta-thalassemia variant. Knowing your carrier status doesn't change your health. It changes your reproductive planning.",
      ],
    ],
  },
  {
    slug: "can-dna-test-diagnose-cancer",
    question: "Can a DNA test diagnose cancer?",
    categorySlug: "health",
    reviewerSlug: "vikram-k",
    tags: ["DNA", "test", "cancer", "diagnose", "BRCA", "oncologist"],
    order: 13,
    answer: [
      [
        "Not on its own, no. But it can identify risk factors that significantly change how cancer is screened for and prevented. A clinical genetic test can identify inherited variants in genes like BRCA1, BRCA2, TP53, MLH1, MSH2, and others that substantially raise the lifetime risk of certain cancers.",
      ],
      [
        "Direct-to-consumer tests sometimes screen for a small number of BRCA variants (the three most common in Ashkenazi Jewish populations, for example). They do not cover the full gene. A negative DTC result does not rule out BRCA-related cancer risk - it only rules out the few variants the test happened to read.",
      ],
      [
        "For anyone with a strong family history of cancer, the right path is a clinical genetic test ordered through an oncologist or genetic counsellor, not a consumer kit.",
      ],
    ],
  },
  {
    slug: "morning-person-night-person-genetic",
    question: "Is being a 'morning person' or 'night person' really genetic?",
    categorySlug: "traits",
    reviewerSlug: "sneha-k",
    tags: [
      "morning",
      "person",
      "night",
      "owl",
      "chronotype",
      "genetic",
      "sleep",
    ],
    order: 14,
    answer: [
      [
        "Yes, substantially. Roughly 40 to 50% of the variation in human chronotype - whether you naturally peak in the morning or the evening - is explained by genetics. A 2019 study in Nature Communications, drawing on data from nearly 700,000 participants, identified more than 350 genetic regions associated with morningness.",
      ],
      [
        "What this means in practice: if you are a natural night owl, fighting your chronotype with willpower will work only partially. A genuinely late chronotype trying to wake at 5am is fighting their own endocrine system.",
      ],
      [
        "What can still be changed: roughly half of chronotype variation is environmental - light exposure, screen use, meal timing, exercise schedule, and consistent sleep windows can shift your rhythm by an hour or so in either direction. But the underlying preference is largely set. If you have always struggled to function early, it may not be a discipline problem.",
      ],
    ],
  },
  {
    slug: "caffeine-affects-people-differently",
    question: "Why does caffeine affect some people way more than others?",
    categorySlug: "traits",
    reviewerSlug: "manas-k",
    tags: [
      "caffeine",
      "affect",
      "CYP1A2",
      "ADORA2A",
      "fast",
      "slow",
      "metaboliser",
    ],
    order: 15,
    answer: [
      [
        "Two genes do most of the explaining: CYP1A2 and ADORA2A. CYP1A2 codes for the enzyme that breaks caffeine down in your liver. A specific variant determines whether you are a fast or slow metaboliser. Roughly half the global population carries at least one copy of the slow variant. In a slow metaboliser, caffeine's half-life in the bloodstream is about 8 to 10 hours, instead of 4 to 5 in a fast metaboliser. The same cup of coffee at 4pm clears by midnight for one person and is still active at 2am for the other.",
      ],
      [
        "ADORA2A codes for the adenosine receptor that caffeine blocks. Variants here change how sensitive you are to caffeine's stimulant effect. Two people can metabolise caffeine at the same speed but feel it very differently.",
      ],
      [
        "If a small dose of caffeine has always felt like too much, or coffee after lunch wrecks your sleep, you are probably carrying one or both of these variants. They are easy to test for.",
      ],
    ],
  },
  {
    slug: "is-height-80-percent-genetic",
    question: "Is height really 80% genetic?",
    categorySlug: "traits",
    reviewerSlug: "vikram-k",
    tags: ["height", "80%", "genetic", "heritability", "polygenic"],
    order: 16,
    answer: [
      [
        "Roughly, yes - though \"80% genetic\" doesn't mean what most people think it means. Heritability estimates for adult height in well-fed populations cluster between 70% and 90%. This means that within a population where everyone has adequate nutrition, about 80% of the variation between people's heights is explained by genetic variation. It does not mean 80% of any individual's height is set by genes.",
      ],
      [
        'The mechanism is highly polygenic. There is no "height gene." A 2022 study in Nature identified more than 12,000 genetic variants that contribute to height, each with a tiny individual effect.',
      ],
      [
        "The remaining 20% of variation is environmental, and it can be substantial - childhood nutrition, illness load, hormone levels during puberty, and prenatal conditions all affect how much of a person's genetic potential they reach. For an individual: your DNA sets a likely range. Your environment determines where in that range you actually land.",
      ],
    ],
  },
  {
    slug: "dna-test-best-diet",
    question: "Can a DNA test tell me what diet is best for me?",
    categorySlug: "traits",
    reviewerSlug: "aruna-g",
    tags: ["diet", "DNA", "best", "nutrigenomics", "LCT", "APOE"],
    order: 17,
    answer: [
      [
        "Partially. The science is real but still limited, and the marketing often outruns the evidence. There are genuine, well-replicated diet-relevant genetic variants: the LCT gene determines whether you can digest lactose into adulthood. APOE variants change how your body responds to dietary saturated fat. FTO variants are associated with weight gain in response to high-carbohydrate diets.",
      ],
      [
        'What current tests cannot do reliably: tell you exactly which calorie target, macro split, or meal timing is "optimal" for you. The science of nutrigenomics is still developing, and the gap between identifying a variant and prescribing a precise plan is large.',
      ],
      [
        "Treat the DNA report as a starting layer of information about your biology. Combine it with how you actually feel and respond to food. The combination is more useful than either alone.",
      ],
    ],
  },
  {
    slug: "genetic-carrier-screening-before-baby",
    question:
      "Should I get genetic carrier screening before trying to have a baby?",
    categorySlug: "pregnancy",
    reviewerSlug: "riya-m",
    tags: [
      "carrier",
      "screening",
      "before",
      "baby",
      "thalassemia",
      "cystic",
      "fibrosis",
    ],
    order: 18,
    answer: [
      [
        'It depends on your family history, your ethnic background, and your appetite for information. For most couples, the answer is "it can be useful, and it is increasingly affordable."',
      ],
      [
        "Carrier screening looks for variants you and your partner each carry that would only become a health concern if a child inherited both copies. In India, carrier rates for beta-thalassemia are particularly high - roughly 1 in 12 people carry a variant. If both partners are carriers, each pregnancy has a 25% risk of producing a child with the condition. Thalassemia screening is recommended in many Indian medical guidelines before marriage or pregnancy.",
      ],
      [
        "The honest counterargument: most carrier screenings return reassuring results, but they can also return unexpected findings that complicate decision-making. Going in with realistic expectations - and with access to a genetic counsellor before and after - is the responsible way to do this.",
      ],
    ],
  },
  {
    slug: "how-accurate-is-nipt",
    question: "How accurate is non-invasive prenatal testing (NIPT)?",
    categorySlug: "pregnancy",
    reviewerSlug: "riya-m",
    tags: [
      "NIPT",
      "non-invasive",
      "prenatal",
      "accurate",
      "Down",
      "syndrome",
      "screening",
    ],
    order: 19,
    answer: [
      [
        "Very accurate for the conditions it is designed to screen, but it is a screening test, not a diagnostic one. The distinction matters. NIPT analyses small fragments of fetal DNA that circulate in the mother's bloodstream during pregnancy. From about 10 weeks of gestation onwards, it can estimate the risk of the most common chromosomal abnormalities with detection rates above 99% and false positive rates below 0.5%.",
      ],
      [
        'What this means: a "high-risk" NIPT result is much more likely to be a true positive than older blood tests would have produced, but it is still not certain. Confirmation requires an invasive diagnostic test (amniocentesis or chorionic villus sampling), which carries a small miscarriage risk but provides a definitive answer.',
      ],
      [
        "The most important thing to know: NIPT results are conversations with a clinician, not headlines.",
      ],
    ],
  },
  {
    slug: "who-owns-my-dna-data",
    question: "Who owns my DNA data after I take a test?",
    categorySlug: "ethics",
    reviewerSlug: "aruna-g",
    tags: [
      "who",
      "owns",
      "DNA",
      "data",
      "privacy",
      "consent",
      "law",
      "enforcement",
    ],
    order: 20,
    answer: [
      [
        "Legally, in most jurisdictions, you do. Practically, that depends on what you signed. When you order a DNA test, you typically sign two consent documents: one for the test itself, and one for what the company can do with your data afterwards. The second one matters more than most people realise.",
      ],
      [
        "The differences between companies are real. Some allow you to opt in or out of research use. Some let you delete your data and ask for the physical sample to be destroyed. Some have shared data with law enforcement under court order (GEDmatch and its role in the Golden State Killer investigation is the famous example). Some have suffered data breaches.",
      ],
      [
        "A few practical steps: read the privacy policy before ordering. Choose the most restrictive sharing setting available. If you want maximum control, choose a company that lets you download your raw data and delete the account.",
      ],
    ],
  },
  {
    slug: "genetic-results-insurance-job",
    question: "Can my genetic test results affect my insurance or job?",
    categorySlug: "ethics",
    reviewerSlug: "aruna-g",
    tags: [
      "genetic",
      "results",
      "insurance",
      "job",
      "discrimination",
      "GINA",
      "law",
    ],
    order: 21,
    answer: [
      [
        "It depends entirely on where you live. In the ",
        { b: "United States" },
        ", GINA (2008) prohibits health insurers and employers from using genetic information to discriminate. The protection does not extend to life insurance, long-term care insurance, or disability insurance.",
      ],
      [
        "In the ",
        { b: "United Kingdom" },
        ", an industry agreement restricts insurers from requiring predictive genetic test results, with one exception for very large life insurance policies and Huntington's disease.",
      ],
      [
        "In the ",
        { b: "European Union" },
        ', the GDPR classes genetic data as "special category" personal data, requiring explicit consent for processing. In ',
        { b: "India" },
        ", there is currently no comprehensive law equivalent to GINA. The Digital Personal Data Protection Act of 2023 provides some protections, but the application to insurance and employment is still being clarified.",
      ],
      [
        "The practical advice: check your specific country's law and your specific insurance contract before ordering if you have concerns.",
      ],
    ],
  },
  {
    slug: "tell-family-about-genetic-result",
    question: "Should I tell my family about a genetic test result?",
    categorySlug: "ethics",
    reviewerSlug: "riya-m",
    tags: ["tell", "family", "genetic", "result", "BRCA", "share", "relatives"],
    order: 22,
    answer: [
      [
        "This is one of the harder questions in clinical genetics. Most counsellors would say yes, but the situation is rarely simple. Many serious genetic findings have implications for biological relatives. If you carry a BRCA1 variant, your siblings each have a 50% chance of carrying it too, and your children each have a 50% chance. Telling family members lets them choose whether to test themselves and, if positive, to access preventive screening or treatment.",
      ],
      [
        "The complications: genetic information often surfaces things people did not want to know. Surprise paternity results - sometimes uncovered by ancestry tests - affect not just the test-taker but everyone connected to them.",
      ],
      [
        "Most genetic counsellors recommend a phased approach: process your own result first. Identify which relatives are at meaningful risk. Reach out privately, in a setting that gives them space to respond. Offer the information without pressuring them to act on it. The decision to share is yours. The information, in a real sense, is also theirs.",
      ],
    ],
  },
  {
    slug: "why-do-some-families-pass-on-twins",
    question: "Why do some families pass on twins?",
    categorySlug: "dna",
    reviewerSlug: "riya-m",
    tags: [
      "twins",
      "families",
      "fraternal",
      "identical",
      "hyperovulation",
      "inherited",
      "genetic",
    ],
    order: 0,
    answer: [
      [
        "Twins run in some families because one type of twinning is partly genetic, while the other type appears to be mostly chance. The honest answer depends entirely on which kind of twins you mean, and the two are biologically very different, which is the root of most of the confusion around this question.",
      ],
      [
        { b: "The two kinds of twins are not the same thing" },
        " Fraternal, or non-identical, twins happen when a woman releases two eggs in a single cycle and both are fertilised by different sperm. The resulting babies are no more genetically alike than any two siblings born years apart. They can be different sexes, and they simply shared a womb at the same time. This is the kind of twinning that can genuinely 'run in families.'",
      ],
      [
        "Identical twins happen when a single fertilised egg splits into two embryos early in development. The resulting children share essentially the same DNA. As far as large studies can tell, this split is a random event that is not reliably tied to family history.",
      ],
      [
        "So when relatives say 'twins run in our family,' they are almost always describing fraternal twins, even if nobody in the conversation realises the distinction is the whole point. Keeping these two apart is the first step to a clear answer.",
      ],
      [
        { b: "Why fraternal twinning is inherited, and through whom" },
        " Fraternal twinning depends on a tendency to release more than one egg at ovulation, a trait called hyperovulation. Variants in genes involved in the hormone signalling behind ovulation, including genes linked to follicle-stimulating hormone, are associated with a higher chance of releasing two eggs in one cycle. A woman who inherits this tendency is more likely to conceive fraternal twins than a woman who does not.",
      ],
      [
        "Here is the part people get wrong, and it explains a lot of confusing family trees. This trait is only expressed in the body that actually ovulates. A man can carry a hyperovulation variant and pass it to his daughter, and she may then have fraternal twins, but he cannot have twins himself because of it. There is nothing in his biology for the gene to act on. This is exactly why fraternal twins can appear to 'skip' the male line and resurface a generation later. The gene travelled through the father silently, invisible in him, and then switched on in his daughter. Families often read this as twins skipping a generation, when really the instruction was being carried quietly the whole time.",
      ],
      [
        { b: "The factors that are not genetic at all" },
        " Several things raise the odds of fraternal twins entirely independently of family history, and they matter just as much as genetics in practice:",
      ],
      [
        { b: "Maternal age." },
        " Older mothers tend to have higher levels of the hormones that can trigger the release of more than one egg, raising the odds of fraternal twins.",
      ],
      [
        { b: "Fertility treatments." },
        " Ovulation-stimulating drugs and IVF substantially increase twin rates, which is a major reason twin births have risen in many countries over recent decades.",
      ],
      [
        { b: "Population background." },
        " Twinning rates differ measurably across populations and regions, for reasons that appear to be partly genetic and partly environmental.",
      ],
      [
        { b: "Previous pregnancies and body size." },
        " Both have been associated with modest shifts in fraternal twinning odds.",
      ],
      [
        "Because of these factors, a woman with no family history of twins can still conceive them, and a woman with a strong family history may never do so. Genetics tilts the odds, it does not set them.",
      ],
      [
        { b: "The bottom line for a hopeful or anxious parent-to-be" },
        " If fraternal twins appear on the mother's side of the family, there may be a modestly raised chance of fraternal twins, and that chance climbs with older maternal age and with fertility treatment. A family history on the father's side can still be passed to a daughter, but it will not affect his own children's twinning odds directly. Identical twins, for now, look like a genuine roll of the dice that current evidence cannot reliably connect to your family tree. If you are specifically hoping for or worried about twins, the most honest summary is that you can estimate the odds shifting up or down, but nobody can promise you an outcome.",
      ],
      [{ b: "Quick FAQ" }],
      [
        { b: "Can twins skip a generation?" },
        " The fraternal-twin tendency can pass silently through a son to his daughter, which is why it can appear to skip a generation in a family tree.",
      ],
      [
        { b: "Do identical twins run in families?" },
        " Current evidence suggests identical twinning is mostly random and does not reliably cluster in families, unlike fraternal twinning.",
      ],
      [
        { b: "Does having one set of fraternal twins mean I'll have more?" },
        " A history of fraternal twins does raise the odds somewhat, since the underlying hyperovulation tendency tends to persist across pregnancies.",
      ],
      [
        { b: "Do fertility treatments cause twins?" },
        " They meaningfully raise the chance of fraternal twins by stimulating the release of more than one egg, independent of any family history.",
      ],
      [
        "We cite sources in the answer itself. We update when the science updates. We say 'we don't know yet' when that is the honest answer.",
      ],
    ],
  },
];
