import { useSelector } from "react-redux";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./About.css";
import MainTitle from "../components/Main_title";

export default function About() {
  const { theme } = useSelector((state) => state);
  return (
    <div className={`${theme.mode} pb-5`}>
      <div
        className="py-5 head d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url(../images/header_Homepage_background.png)",
          backgroundSize: "cover",
        }}
      >
        <Container fluid>
          <Row className="justify-content-center align-items-center">
            <Col md="6" className="h-100">
              <div className={`card-left ${theme.mode}`}>
                <div className="card-text-about pb-5 pe-5 ps-5 pt-3">
                  <MainTitle name="About us" styles={"fs-2"} />
                  <div className="fs-6">
                    Al-Ittihad School is a private school located in the heart
                    of Cairo, Egypt. We offer a comprehensive education program
                    for students from Kindergarten through Grade 3. Our mission
                    is to provide an excellent education that prepares our
                    students for success in the 21st century.
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className=" d-none d-lg-block">
              <div className="d-flex justify-content-center">
                <img
                  src="images/about.jpg"
                  className="w-75 img-fluid img-responsive rounded-5"
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <MainTitle name="Governors" />
          <Col className="my-5 py-5">
            <ListGroup className="shadow">
              <ListGroup.Item variant={theme.mode}>
                Setting the overarching strategic direction, policies and
                priorities of the school in line with the school’s guiding
                statementsBilingual Arabic / English Education
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Overseeing the educational performance of the school
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Overseeing the financial sustainability of the school
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Overseeing school compliance with applicable laws, regulations
                and standards
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Ensuring the school governance is underpinned by the founding
                values and guiding principles of the school
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Evaluating and approving special projects and innovations, such
                as school building expansion, and information technology plans
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Recruiting and monitoring the performance of senior school
                leadership
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Ensuring the accountability of the senior school leadership
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <MainTitle name="WHY CHOOSE THE UNION" />
          <Col className="my-5 py-5">
            <ListGroup className="shadow">
              <ListGroup.Item variant={theme.mode}>
                Al Ittihad Private School–Jumeira is one of the five Al Ittihad
                Private School branches and opened its doors in 1998. IPS-J is
                serving a community of over 2800 students and has become one of
                the premier schools in Dubai offering an American Curriculum.
                The school follows a standards-based US curricular program
                (California and MOE standards) from Pre-K to Grade 12 designed
                to prepare students for post-secondary education. IPS-J is an
                inclusive school offering a learning support program, which
                enables the admissions of a managed number of students requiring
                learning support at each grade level.
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                An enriched American Curriculum – PreK to Grade 3
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Bilingual Arabic / English Education
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Strong Islamic and Heritage Studies
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Personalized Education
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                Family oriented Community School since 1998
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <MainTitle name="School Facilities" />
          <Col className="my-5 py-5">
            <ListGroup className="shadow">
              <ListGroup.Item variant={theme.mode}>
                <p className="fs-4 fw-bold">Buildings</p>
                The modern, appropriately equipped, well maintained, and
                beautifully built IPS-Jumeira campus sprawls on almost 1,000,000
                sq. ft. of land situated in Jumeira, Dubai-UAE. It comprises of
                five purpose-built, large, modern academic buildings for
                Kindergarten, Elementary, High School -Boys and Girls Sections,
                an administration building.
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                <p className="fs-4 fw-bold">Clinics</p>
                Clinics The health and safety of the students are the top
                priority of the school. Three clinics, with a full time doctor
                and three nurses meet up to the prescribed standard of the Dubai
                Health Authority. Additionally, a number of staff members have
                received First Aid training. Furthermore, there are portable
                First Aid Kits available in school buses and in each section.
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                <p className="fs-4 fw-bold">Sports</p>
                Sports An impressive spacious air-conditioned gym with a large
                seating capacity and a big stage is used as the main indoor
                teaching space for the Physical Education Department for the
                Middle and High Schools. Kindergarten and Elementary Sections
                have their own well-padded, air-conditioned and appropriately
                equipped PE rooms. It is also used for competitions,
                celebrations, assemblies, performances and other large scale
                events.
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                <p className="fs-4 fw-bold">Libraries and Resource Center</p>
                Also the school has a 2 large, well furnished and well stocked
                Libraries that provide an exciting range of fiction and
                non-fiction books and resources including periodicals, journals,
                newspapers, videos, DVDs, and audio-cassettes. Computers are
                provided in the libraries and the Resource Center for research
                and internet use. All students have regular access to the
                library, fostering development of life-long learning, research
                skills and a love for reading. The library/media staff provide
                an ongoing program of instruction in effective use of resource
                materials and equipment; assist the students in developing their
                research abilities and apply appropriate policies for library
                use and the means of assessing effectiveness.
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                <p className="fs-4 fw-bold">Cafeterias</p>
                Attractive, air conditioned indoor eating area and canteen
                facilities are available in each section which allow students to
                enjoy their eating time in a pleasant and comfortable setting.
                The school cafeteria strictly adheres to the prescribed high
                standards of Dubai Municipality. A selection of healthy snacks
                and delicious hot food is available that is closely monitored to
                ensure alignment with the school policy on promotion of healthy
                choices.
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                <p className="fs-4 fw-bold">Recreational Areas</p>
                These attractive shaded courtyards and green fenced areas dotted
                around the campus are fitted out with benches to allow students
                to meet with friends, snack and relax in calm surroundings.
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                <p className="fs-4 fw-bold">ICT Facilities</p>There are 6 well
                equipped Computer Labs available for students to use all
                connected to the school’s network running Microsoft Server 2007.
                These excellent resources are all aimed at enhancing the quality
                of teaching and learning within the school. - Interactive
                whiteboards in every classroom - Projectors and desktops in
                every classroom - High speed internet access - Wireless Networks
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                <p className="fs-4 fw-bold">Science Laboratories</p>
                IPS-Jumeira emphasizes developing the scientific skills, such as
                observing, exploring, investigating, inferring, experimenting,
                and problem solving. To support this approach the school has
                four fully equipped, purpose-built Science Labs (including
                physics/chemistry) and a full time science technician. ICT use
                is encouraged to explain abstract ideas and theories and to
                record data from experiments.
              </ListGroup.Item>
              <ListGroup.Item variant={theme.mode}>
                <p className="fs-4 fw-bold">Art Rooms</p>
                IPS-Jumeira believed that art is not only the mastery of skills
                and creative expression but also a form of communication and
                creative expression of ideas. The school has three spacious
                well-resourced art rooms where students develop their art skills
                and techniques utilizing various mediums and learn to express
                themselves through this form of language. Students are
                encouraged to explore their talents within painting, drawing,
                printmaking, textiles, and architecture, allowing them to
                experience a wide range of techniques and applications.
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
