/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.user.deleteMany({})
  await prisma.userDocument.deleteMany({})
  await prisma.group.deleteMany({})

  await prisma.user.upsert({
    where: { email: 'test@testum.de2' },
    update: {},
    create: {
      id: 'ckn4oul7100004cv7y3t94n8j',
      email: `test@testum.de2`,
      password: `$2a$10$d.P8dAo.0pmsvW2xwsH7sudRMhSBiCvOfEkN8JBeuvHBs1ZtLUdoe`, // EBNPXY35TYkYXHs
      name: 'Alice',
      documents: {
        create: [
          {
            type: 'Article',
            title: 'Clebsch-Lagrange variational principle and geometric constraint analysis of relativistic field theories',
            author: 'Tobias Diez and Gerd Rudolph',
            abstract: 'Inspired by the Clebsch optimal control problem, we introduce a new variational principle that is suitable for capturing the geometry of relativistic field theories with constraints related to a gauge symmetry. Its special feature is that the Lagrange multipliers couple to the configuration variables via the symmetry group action. The resulting constraints are formulated as a condition on the momentum map of the gauge group action on the phase space of the system. We discuss the Hamiltonian picture and the reduction in the gauge symmetry by stages in this geometric setting. We show that the Yang–Mills–Higgs action and the Einstein–Hilbert action fit into this new framework after a (1 + 3)-splitting. Moreover, we recover the Gaus constraint of Yang–Mills–Higgs theory and the diffeomorphism constraint of general relativity as momentum map constraints.Inspired by the Clebsch optimal control problem, we introduce a new variational principle that is suitable for capturing the geometry of relativistic field theories with constraints related to a gauge symmetry. Its special feature is that the Lagrange multipliers couple to the configuration variables via the symmetry group action. The resulting constraints are formulated as a condition on the momentum map of the gauge group action on the phase space of the system. We discuss the Hamiltonian picture and the reduction in the gauge symmetry by stages in this geometric setting. We show that the Yang–Mills–Higgs action and the Einstein–Hilbert action fit into this new framework after a (1 + 3)-splitting. Moreover, we recover the Gaus constraint of Yang–Mills–Higgs theory and the diffeomorphism constraint of general relativity as momentum map constraints.',
            keywords: 'Diffeomorphism constraint, gauge symmetry',
          },
          {
            type: 'PhdThesis',
            title: 'The postcranial anatomy of \textit{Procolophon} (Parareptilia: Procolophonidae) and its implications for the origin of turtles',
            author: 'Michael deBraga',
            citationKey: 'deBraga2001',
            year: '2001',
            other: [
              {
                school: 'Department of Zoology, University of Toronto',
                address: 'Canada',
              },
            ],
          },
          {
            type: 'Article',
            title: 'The trouble with login: on usability and computer security in ubiquitous computing',
            doi: 'http://dx.doi.org/10.1007/s00779-005-0347-6',
            issn: '1617-4909',
            number: '6',
            pages: '357--367',
            volume: '9',
            journal: 'Personal Ubiquitous Comput.',
            priority: 'prio1',
            year: '2005',
            other: [
              {
                publisher: 'Springer-Verlag',
              },
            ],
          },
          {
            type: 'Article',
            author: 'Jeff Yan and Alan Blackwell and Ross Anderson and Alasdair Grant',
            journal: 'IEEE Security and Privacy',
            year: '2004',
            volume: '2',
            pages: '25--31',
            number: '5',
            doi: 'http://dx.doi.org/10.1109/MSP.2004.81',
            issn: '1540-7993',
          },
        ],
      },
      groups: {
        create: [
          {
            id: 'ckn4h9pl5000101le5bco3b8r',
            name: 'History of Chocolate',
            icon: 'history',
          },
          {
            id: 'ckn4i99oe000101mc4igzgvix',
            name: 'Chocolate Ingredients',
            icon: 'concierge-bell',
            children: {
              create: [
                {
                  id: 'ckn4i9dr1000301mc9oekh3nu',
                  name: 'Beans',
                  icon: 'leaf'
                },
                {
                  id: 'ckn4i9hg6000501mc21l9dmzb',
                  name: 'Sugar',
                  icon: 'candy-cane',
                },
                {
                  id: 'ckn4i9qek000701mc82eqagmz',
                  name: 'Milk',
                  icon: 'glass-whiskey',
                },
              ],
            },
          },
          {
            id: 'ckn4i9u9m000901mcc4mjgdkq',
            name: 'Chocolate Making',
            icon: 'project-diagram',
            children: {
              create: [
                {
                  id: 'ckn4i9zhq000b01mcgqjxdvcv',
                  name: 'Roasting',
                  icon: 'fire',
                },
                {
                  id: 'ckn4ia3i2000d01mcdizx83np',
                  name: 'Grinding',
                  icon: 'mortar-pestle',
                },
                {
                  id: 'ckn4ia876000f01mc0w5kgecg',
                  name: 'Conching',
                  icon: 'blender',
                },
              ],
            },
          },
          {
            id: 'ckn4iaf1t000h01mcaob9ewey',
            name: 'Consumption',
            icon: 'laugh-beam',
            children: {
              create: [
                {
                  id: 'ckn4iajdx000j01mc8x219zb6',
                  name: 'Drink',
                  icon: 'mug-hot',
                },
                {
                  id: 'ckn4ian59000l01mc78zp3ryh',
                  name: 'Eat',
                  icon: 'cookie-bite',
                },
              ],
            },
          },
          {
            id: 'ckn4iar8j000n01mc7feq709f',
            name: 'Health',
            icon: 'heartbeat',
            children: {
              create: [
                {
                  id: 'ckn4iav33000p01mc3htz2ijx',
                  name: 'Nutrition',
                  icon: 'capsules',
                },
                {
                  id: 'ckn4iazmc000r01mc1a0d6l0s',
                  name: 'Positive Heath Effects',
                  icon: 'notes-medical',
                },
              ],
            },
          },
        ],
      },
    },
  })
  // Assign groups to user (doesn't work automatically for neasted writes)
  for (const group of [
    'ckn4i9dr1000301mc9oekh3nu',
    'ckn4i9hg6000501mc21l9dmzb',
    'ckn4i9qek000701mc82eqagmz',
    'ckn4i9zhq000b01mcgqjxdvcv',
    'ckn4ia3i2000d01mcdizx83np',
    'ckn4ia876000f01mc0w5kgecg',
    'ckn4iajdx000j01mc8x219zb6',
    'ckn4ian59000l01mc78zp3ryh',
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
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
