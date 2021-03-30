/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  prisma.user.deleteMany({})

  await prisma.user.upsert({
    where: { email: 'test@testum.de2' },
    update: {},
    create: {
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
            groups: 'Dragons',
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
    },
  })
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
