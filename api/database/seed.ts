import prisma from '@prisma/client'
import type { PrismaClient as PrismaClientT } from '@prisma/client'
const { PrismaClient, GroupType, GroupHierarchyType } = prisma

async function seedInternal(prisma: PrismaClientT): Promise<void> {
  await prisma.user.deleteMany({})
  await prisma.userDocument.deleteMany({})
  await prisma.userDocumentOtherField.deleteMany({})
  await prisma.group.deleteMany({})

  await prisma.user.create({
    data: {
      id: 'ckn4oul7100004cv7y3t94n8j',
      email: 'alice@jabref.de',
      password:
        'saltsaltsaltsaltsaltsaltsaltsalt63f7e072b6a9faf6e77616c098c4bb3ac69c58d249e620e1dd51257018ac7fcb40b576e9f69e9c556c70a980327dac12b1ee76a76f22b249d585fe2de10b365a', // EBNPXY35TYkYXHs
      name: 'Alice',
    },
  })

  await prisma.userDocument.create({
    data: {
      id: 'ckondtcaf000101mh7x9g4gia',
      type: 'JOURNAL_ARTICLE',
      title: 'Cocoa and Cardiovascular Health',
      author:
        'Corti, Roberto and Flammer, Andreas J. and Hollenberg, Norman K. and Luscher, Thomas F.',
      abstract:
        'Epidemiological data demonstrate that regular dietary intake of plant-derived foods and beverages reduces the risk of coronary heart disease and stroke. Among many ingredients, cocoa might be an important mediator. Indeed, recent research demonstrates a beneficial effect of cocoa on blood pressure, insulin resistance, and vascular and platelet function. Although still debated, a range of potential mechanisms through which cocoa might exert its benefits on cardiovascular health have been proposed, including activation of nitric oxide and antioxidant and antiinflammatory effects. This review summarizes the available data on the cardiovascular effects of cocoa, outlines potential mechanisms involved in the response to cocoa, and highlights the potential clinical implications associated with its consumption. ( Circulation. 2009; 119: 1433-1441.)',
      keywords: ['cocoa', 'endothelium', 'hypertension', 'platelets'],
      doi: '10.1161/CIRCULATIONAHA.108.827022',
      journalIssue: {
        create: {
          id: 'ckslizms5000109jv3yx80ujf',
          journal: {
            create: {
              id: 'ckslj094u000309jvdpng93mk',
              name: 'Circulation',
            },
          },
          volume: '119',
          number: '10',
        },
      },
      pageStart: '1433',
      pageEnd: '1441',
      publishedAt: '2009',
    },
  })
  await prisma.userDocument.create({
    data: {
      id: 'ckr9eq4oc000101mk1ga9bxnt',
      type: 'JOURNAL_ARTICLE',
      title: 'Cocoa and health: a decade of research',
      author:
        'Cooper, Karen A. and Donovan, Jennifer L. and Waterhouse, Andrew L. and Williamson, Gary',
      abstract:
        'It has been over 10 years since the first mention in a medical journal about cocoa and chocolate as potential sources of antioxidants for health. During this time, cocoa has been found to improve antioxidant status, reduce inflammation and correlate with reduced heart disease risk; with these results, and its popularity, it has received wide coverage in the press. However, after 10 years of research, what is known about the potential health benefits of cocoa and what are the important next steps in understanding this decadent source of antioxidants?',
      keywords: ['cocoa', 'chocolate', 'health', 'polyphenols', 'antioxident'],
      doi: '10.1017/S0007114507795296',
      journalIssue: {
        create: {
          id: 'ckslj1d4t000509jv5j9n0mz0',
          journal: {
            create: {
              id: 'ckslj1heh000709jv5ja9dcyn',
              name: 'British Journal of Nutrition',
            },
          },
          volume: '99',
          number: '1',
        },
      },
      pageStart: '1',
      pageEnd: '11',
      publishedAt: '2008',
    },
  })
  await prisma.userDocument.create({
    data: {
      id: 'ckr9eqap6000301mk20hycjqb',
      type: 'JOURNAL_ARTICLE',
      title:
        'Chocolate and prevention of cardiovascular disease: A systematic review',
      author:
        'Ding, Eric L. and Hutfless, Susan M. and Ding, Xin and Girotra, Saket',
      abstract: `
        Background: Consumption of chocolate has been often hypothesized to reduce the risk of cardiovascular disease (CVD) due to chocolate's high levels of stearic acid and antioxidant flavonoids. However, debate still lingers regarding the true long term beneficial cardiovascular effects of chocolate overall.
        Methods: We reviewed English-language MEDLINE publications from 1966 through January 2005 for experimental, observational, and clinical studies of relations between cocoa, cacao, chocolate, stearic acid, flavonoids ( including flavonols, flavanols, catechins, epicatechins, and procynadins) and the risk of cardiovascular disease ( coronary heart disease (CHD), stroke). A total of 136 publications were selected based on relevance, and quality of design and methods. An updated meta-analysis of flavonoid intake and CHD mortality was also conducted.
        Results: The body of short-term randomized feeding trials suggests cocoa and chocolate may exert beneficial effects on cardiovascular risk via effects on lowering blood pressure, anti-inflammation, anti-platelet function, higher HDL, decreased LDL oxidation. Additionally, a large body of trials of stearic acid suggests it is indeed cholesterol-neutral. However, epidemiologic studies of serum and dietary stearic acid are inconclusive due to many methodologic limitations. Meanwhile, the large body of prospective studies of flavonoids suggests the flavonoid content of chocolate may reduce risk of cardiovascular mortality. Our updated meta-analysis indicates that intake of flavonoids may lower risk of CHD mortality, RR = 0.81 (95% CI: 0.71 - 0.92) comparing highest and lowest tertiles.
        Conclusion: Multiple lines of evidence from laboratory experiments and randomized trials suggest stearic acid may be neutral, while flavonoids are likely protective against CHD mortality. The highest priority now is to conduct larger randomized trials to definitively investigate the impact of chocolate consumption on long-term cardiovascular outcomes.`,
      keywords: ['dark chocolate', 'flavonoid intake'],
      doi: '10.1186/1743-7075-3-2',
      journalIssue: {
        create: {
          id: 'ckslj284j000909jv42d1efc6',
          journal: {
            create: {
              id: 'ckslj2ca3000b09jvdmyj6552',
              name: 'Nutrition & Metabolism',
            },
          },
          volume: '3',
          number: '2',
        },
      },
      publishedAt: '2006',
    },
  })
  await prisma.userDocument.create({
    data: {
      id: 'ckonduhjk000701mh12wia4nf',
      type: 'JOURNAL_ARTICLE',
      title: 'Cocoa and Chocolate in Human Health and Disease',
      author: 'Katz, David L. and Doughty, Kim and Ali, Ather',
      abstract:
        'Cocoa contains more phenolic antioxidants than most foods. Flavonoids, including catechin, epicatechin, and procyanidins predominate in antioxidant activity. The tricyclic structure of the flavonoids determines antioxidant effects that scavenge reactive oxygen species, chelate Fe2+ and Cu+, inhibit enzymes, and upregulate antioxidant defenses. The epicatechin content of cocoa is primarily responsible for its favorable impact on vascular endothelium via its effect on both acute and chronic upregulation of nitric oxide production. Other cardiovascular effects are mediated through anti-inflammatory effects of cocoa polyphenols, and modulated through the activity of NF-kappa B. Antioxidant effects of cocoa may directly influence insulin resistance and, in turn, reduce risk for diabetes. Further, cocoa consumption may stimulate changes in redox-sensitive signaling pathways involved in gene expression and the immune response. Cocoa can protect nerves from injury and inflammation, protect the skin from oxidative damage from UV radiation in topical preparations, and have beneficial effects on satiety, cognitive function, and mood. As cocoa is predominantly consumed as energy-dense chocolate, potential detrimental effects of overconsumption exist, including increased risk of weight gain. Overall, research to date suggests that the benefits of moderate cocoa or dark chocolate consumption likely outweigh the risks.',
      keywords: ['dark chocolate', 'blood pressure'],
      doi: '10.1089/ars.2010.3697',
      journalIssue: {
        create: {
          id: 'ckslj3bi8000d09jvhcsx7d3e',
          journal: {
            create: {
              id: 'ckslj3f10000f09jvc1xifgi9',
              name: 'Antioxidants & Redox Signaling',
            },
          },
          volume: '15',
          number: '10',
        },
      },
      pageStart: '2779',
      pageEnd: '2811',
      publishedAt: '2011',
    },
  })
  await prisma.userDocument.create({
    data: {
      id: 'ckondu6bh000501mh2o2tf00u',
      type: 'PROCEEDINGS_ARTICLE',
      title: 'Chocolate: food as medicine/medicine as food',
      author: 'Keen, Carl L.',
      abstract:
        'Cocoa and chocolate products have been delicacies for hundreds of years. Only recently have they been recognized as significant sources of phytochemicals with healthful effects. These foods are among the most concentrated sources of the procyanidin flavonoids, catechin and epicatechin. Recent studies have shown that these polyphenols are absorbed from the intestine of animals and humans with epicatechin absorbed much more than catechin. These flavonoids have potent antioxidant and antiplatelet activities following consumption of cocoa or chocolate.',
      keywords: [
        'chocolate',
        'flavonoids',
        'antioxidants',
        'procyanidins',
        'epicatechin',
      ],
      doi: '10.1080/07315724.2001.10719181',
      booktitle:
        'Ross Products Research Conference on Medical Issues, Synergy in Medical and Nutrition Therapy',
      publishedAt: '2001',
    },
  })
  await prisma.userDocument.create({
    data: {
      id: 'ckondtpcn000301mhg9lvaqlu',
      type: 'THESIS',
      title:
        'Functionality of inulin and polydextrose in stevia or thaumatin sweetened dark chocolate',
      author: 'Roger Aidoo',
      publishedAt: '2015',
      abstract:
        'Chocolate is a high energy product with carbohydrates, including sugar, together with fat, as the main sources of energy. Sucrose is utilized up to 30-60% in chocolate and this confers multiple functional properties on chocolate including sweetness, bulkiness and mouthfeel (texture). Today’s consumers are concerned about the high sugar levels, calories and cariogenicity effects in confectionery products, hence growing the popularity of “light” and “sugar-free” products. This has led to the search for low calorie, low glycemic index, healthier alternatives. Polydextrose and inulin are considered as fibers with many interesting functional attributes that meet the needs of the food industry for healthy foods. Stevia and thaumatin are natural high potency (intense) sweeteners with sensory properties superior to those of other sweeteners. This research investigated the functionality of inulin and polydextrose as sucrose replacers (bulking agents) in sugar-free dark chocolates with stevia or thaumatin as intense sweeteners. The type of bulking agent and concentrations used greatly influenced the rheological properties, textural, melting behaviours and other physical quality characteristics of the developed sugar-free chocolates. Microstructural examination revealed that inulin, which had a lower density than polydextrose tend to have more solids per volume and increased particle volume fraction and solid’s surface area, resulting in a higher particle collision and aggregation thereby limiting chocolate flow. This research also reports for the first time, results of a comparative study of the sweetness brought by the intense sweeteners (stevia and thaumatin) in the sugar-free dark chocolates. With opportunity for improvements in quality of reduced calorie chocolates, findings from this research could be applied to develop or reformulate diabetic and/or reduced calorie chocolates to better meet consumer expectations.',
      keywords: ['polydextrose', 'chocolate', 'inulin', 'stevia'],
      other: {
        create: [
          {
            field: 'institution',
            value: 'Ghent University',
          },
        ],
      },
    },
  })
  await prisma.group.create({
    data: {
      id: 'ckn4h9pl5000101le5bco3b8r',
      name: 'History of Chocolate',
      displayName: 'History of Chocolate',
      icon: 'history',
      hierarchyType: GroupHierarchyType.INDEPENDENT,
      isExpanded: true,
      type: GroupType.ExplicitGroup,
    },
  })
  await prisma.group.create({
    data: {
      id: 'ckn4i99oe000101mc4igzgvix',
      name: 'Chocolate Ingredients',
      displayName: 'Chocolate Ingredients',
      icon: 'concierge-bell',
      hierarchyType: GroupHierarchyType.INDEPENDENT,
      isExpanded: true,
      type: GroupType.ExplicitGroup,
      children: {
        create: [
          {
            id: 'ckn4i9dr1000301mc9oekh3nu',
            name: 'Beans',
            displayName: 'Beans',
            icon: 'leaf',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
          {
            id: 'ckn4i9hg6000501mc21l9dmzb',
            name: 'Sugar',
            displayName: 'Sugar',
            icon: 'candy-cane',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
          {
            id: 'ckn4i9qek000701mc82eqagmz',
            name: 'Milk',
            displayName: 'Milk',
            icon: 'glass-whiskey',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
        ],
      },
    },
  })
  await prisma.group.create({
    data: {
      id: 'ckn4i9u9m000901mcc4mjgdkq',
      name: 'Chocolate Making',
      displayName: 'Chocolate Making',
      icon: 'project-diagram',
      hierarchyType: GroupHierarchyType.INDEPENDENT,
      isExpanded: true,
      type: GroupType.ExplicitGroup,
      children: {
        create: [
          {
            id: 'ckn4i9zhq000b01mcgqjxdvcv',
            name: 'Roasting',
            displayName: 'Roasting',
            icon: 'fire',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
          {
            id: 'ckn4ia3i2000d01mcdizx83np',
            name: 'Grinding',
            displayName: 'Grinding',
            icon: 'mortar-pestle',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
          {
            id: 'ckn4ia876000f01mc0w5kgecg',
            name: 'Conching',
            displayName: 'Conching',
            icon: 'blender',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
        ],
      },
    },
  })
  await prisma.group.create({
    data: {
      id: 'ckn4iaf1t000h01mcaob9ewey',
      name: 'Consumption',
      displayName: 'Consumption',
      icon: 'laugh-beam',
      hierarchyType: GroupHierarchyType.INDEPENDENT,
      isExpanded: true,
      type: GroupType.ExplicitGroup,
      children: {
        create: [
          {
            id: 'ckn4iajdx000j01mc8x219zb6',
            name: 'Drink',
            displayName: 'Drink',
            icon: 'mug-hot',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
          {
            id: 'ckn4ian59000l01mc78zp3ryh',
            name: 'Eat',
            displayName: 'Eat',
            icon: 'cookie-bite',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
        ],
      },
    },
  })
  await prisma.group.create({
    data: {
      id: 'ckn4iar8j000n01mc7feq709f',
      name: 'Health',
      displayName: 'Health',
      icon: 'heartbeat',
      hierarchyType: GroupHierarchyType.INDEPENDENT,
      isExpanded: true,
      type: GroupType.ExplicitGroup,
      children: {
        create: [
          {
            id: 'ckn4iav33000p01mc3htz2ijx',
            name: 'Nutrition',
            displayName: 'Nutrition',
            icon: 'capsules',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
          {
            id: 'ckn4iazmc000r01mc1a0d6l0s',
            name: 'Positive Heath Effects',
            displayName: 'Positive Heath Effects',
            icon: 'notes-medical',
            hierarchyType: GroupHierarchyType.INDEPENDENT,
            isExpanded: true,
            type: GroupType.ExplicitGroup,
          },
        ],
      },
    },
  })

  // Assign documents to user
  for (const document of [
    'ckondtcaf000101mh7x9g4gia',
    'ckondtpcn000301mhg9lvaqlu',
    'ckondu6bh000501mh2o2tf00u',
    'ckonduhjk000701mh12wia4nf',
    'ckr9eqap6000301mk20hycjqb',
    'ckr9eq4oc000101mk1ga9bxnt',
  ]) {
    await prisma.userDocument.update({
      where: {
        id: document,
      },
      data: {
        users: {
          connect: {
            id: 'ckn4oul7100004cv7y3t94n8j',
          },
        },
      },
    })
  }

  // Assign documents to group
  for (const document of [
    'ckondtcaf000101mh7x9g4gia',
    'ckr9eq4oc000101mk1ga9bxnt',
    'ckr9eqap6000301mk20hycjqb',
    'ckonduhjk000701mh12wia4nf',
    'ckondu6bh000501mh2o2tf00u',
    'ckondtpcn000301mhg9lvaqlu',
  ]) {
    await prisma.userDocument.update({
      where: {
        id: document,
      },
      data: {
        explicitGroups: {
          connect: {
            // Health
            id: 'ckn4iar8j000n01mc7feq709f',
          },
        },
      },
    })
  }
  for (const document of [
    'ckondtcaf000101mh7x9g4gia',
    'ckr9eq4oc000101mk1ga9bxnt',
    'ckr9eqap6000301mk20hycjqb',
    'ckonduhjk000701mh12wia4nf',
    'ckondu6bh000501mh2o2tf00u',
  ]) {
    await prisma.userDocument.update({
      where: {
        id: document,
      },
      data: {
        explicitGroups: {
          connect: {
            // Positive Health Effects
            id: 'ckn4iazmc000r01mc1a0d6l0s',
          },
        },
      },
    })
  }

  // Assign groups to user
  for (const group of [
    'ckn4h9pl5000101le5bco3b8r',
    'ckn4i99oe000101mc4igzgvix',
    'ckn4i9dr1000301mc9oekh3nu',
    'ckn4i9hg6000501mc21l9dmzb',
    'ckn4i9qek000701mc82eqagmz',
    'ckn4i9u9m000901mcc4mjgdkq',
    'ckn4i9zhq000b01mcgqjxdvcv',
    'ckn4ia3i2000d01mcdizx83np',
    'ckn4ia876000f01mc0w5kgecg',
    'ckn4iaf1t000h01mcaob9ewey',
    'ckn4iajdx000j01mc8x219zb6',
    'ckn4ian59000l01mc78zp3ryh',
    'ckn4iar8j000n01mc7feq709f',
    'ckn4iav33000p01mc3htz2ijx',
    'ckn4iazmc000r01mc1a0d6l0s',
  ]) {
    await prisma.group.update({
      where: {
        id: group,
      },
      data: {
        users: {
          connect: {
            id: 'ckn4oul7100004cv7y3t94n8j',
          },
        },
      },
    })
  }
}

export async function seed(): Promise<void> {
  const prisma = new PrismaClient()
  try {
    await seedInternal(prisma)
  } finally {
    await prisma.$disconnect()
  }
}
