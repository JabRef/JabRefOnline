import { PrismaClient, GroupType, GroupHierarchyType } from '@prisma/client'

async function seedInternal(prisma: PrismaClient): Promise<void> {
  await prisma.user.deleteMany({})
  await prisma.userDocument.deleteMany({})
  await prisma.group.deleteMany({})

  await prisma.user.create({
    data: {
      id: 'ckn4oul7100004cv7y3t94n8j',
      email: `test@testum.de2`,
      password: `$2a$10$d.P8dAo.0pmsvW2xwsH7sudRMhSBiCvOfEkN8JBeuvHBs1ZtLUdoe`, // EBNPXY35TYkYXHs
      name: 'Alice',
    },
  })

  await prisma.userDocument.create({
    data: {
      id: 'ckondtcaf000101mh7x9g4gia',
      type: 'Article',
      title:
        'Clebsch-Lagrange variational principle and geometric constraint analysis of relativistic field theories',
      author: 'Tobias Diez and Gerd Rudolph',
      abstract:
        'Inspired by the Clebsch optimal control problem, we introduce a new variational principle that is suitable for capturing the geometry of relativistic field theories with constraints related to a gauge symmetry. Its special feature is that the Lagrange multipliers couple to the configuration variables via the symmetry group action. The resulting constraints are formulated as a condition on the momentum map of the gauge group action on the phase space of the system. We discuss the Hamiltonian picture and the reduction in the gauge symmetry by stages in this geometric setting. We show that the Yang–Mills–Higgs action and the Einstein–Hilbert action fit into this new framework after a (1 + 3)-splitting. Moreover, we recover the Gaus constraint of Yang–Mills–Higgs theory and the diffeomorphism constraint of general relativity as momentum map constraints.Inspired by the Clebsch optimal control problem, we introduce a new variational principle that is suitable for capturing the geometry of relativistic field theories with constraints related to a gauge symmetry. Its special feature is that the Lagrange multipliers couple to the configuration variables via the symmetry group action. The resulting constraints are formulated as a condition on the momentum map of the gauge group action on the phase space of the system. We discuss the Hamiltonian picture and the reduction in the gauge symmetry by stages in this geometric setting. We show that the Yang–Mills–Higgs action and the Einstein–Hilbert action fit into this new framework after a (1 + 3)-splitting. Moreover, we recover the Gaus constraint of Yang–Mills–Higgs theory and the diffeomorphism constraint of general relativity as momentum map constraints.',
      keywords: 'Diffeomorphism constraint, gauge symmetry',
    },
  })
  await prisma.userDocument.create({
    data: {
      id: 'ckondtpcn000301mhg9lvaqlu',
      type: 'PhdThesis',
      title:
        'The postcranial anatomy of \textit{Procolophon} (Parareptilia: Procolophonidae) and its implications for the origin of turtles',
      author: 'Michael deBraga',
      citationKey: 'deBraga2001',
      year: '2001',
      other: {
        create: [
          {
            field: 'school',
            value: 'Department of Zoology, University of Toronto',
          },
          {
            field: 'address',
            value: 'Canada',
          },
        ],
      },
    },
  })
  await prisma.userDocument.create({
    data: {
      id: 'ckondu6bh000501mh2o2tf00u',
      type: 'Article',
      title:
        'The trouble with login: on usability and computer security in ubiquitous computing',
      doi: 'http://dx.doi.org/10.1007/s00779-005-0347-6',
      issn: '1617-4909',
      number: '6',
      pages: '357--367',
      volume: '9',
      journal: 'Personal Ubiquitous Comput.',
      priority: 'prio1',
      year: '2005',
      other: {
        create: {
          field: 'publisher',
          value: 'Springer-Verlag',
        },
      },
    },
  })
  await prisma.userDocument.create({
    data: {
      id: 'ckonduhjk000701mh12wia4nf',
      type: 'Article',
      author:
        'Jeff Yan and Alan Blackwell and Ross Anderson and Alasdair Grant',
      journal: 'IEEE Security and Privacy',
      year: '2004',
      volume: '2',
      pages: '25--31',
      number: '5',
      doi: 'http://dx.doi.org/10.1109/MSP.2004.81',
      issn: '1540-7993',
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
