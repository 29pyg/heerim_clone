// pages/index.js
import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import UserLayout from 'src/layouts';
import langJson from 'src/data/lang.json'
import { useRouter } from "next/router";
const sections = ["section1", "section2", "section3", "section4", "section5"]; // 섹션 이름
const totalIcons = 10; // 총 아이콘 개수
const iconsPerPage = 7; // 한 페이지에 표시할 아이콘 개수

const Home = () => {


    const router = useRouter();
    const { lang = 'kr' } = router.query;
    const [activeSection, setActiveSection] = useState(0); // 활성 섹션 인덱스
    const [iconIndexes, setIconIndexes] = useState(Array.from({ length: iconsPerPage }, (_, i) => i)); // 표시되는 아이콘 인덱스 배열
    const sectionRefs = useRef([]);
    const videoRef = useRef(null); // 비디오 요소를 관리하기 위한 ref
    const [loading, setLoading] = useState(true);
    const [hoveredImage, setHoveredImage] = useState(""); // 호버된 이미지 상태
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
    const [inViewItems2, setInViewItems2] = useState([]);
    const [inViewItems3, setInViewItems3] = useState([]);
    const [inViewItems4, setInViewItems4] = useState([]);
    const [inViewItems5, setInViewItems5] = useState([]);

    //fadein 애니메이션
    useEffect(() => {
        const handleScroll = () => {
            const updatedInViewItems2 = [];
            const updatedInViewItems3 = [];
            const updatedInViewItems4 = [];
            const updatedInViewItems5 = [];
            const fadeIn2 = document.querySelectorAll(".green-box");
            const fadeIn3 = document.querySelectorAll(".project-box");
            const fadeIn4 = document.querySelectorAll(".news-item");
            const fadeIn5 = document.querySelectorAll(".bottom");

            fadeIn2.forEach((item2) => {
                const itemRect2 = item2.getBoundingClientRect();
                if (itemRect2.top < window.innerHeight && itemRect2.bottom >= 0) {
                    updatedInViewItems2.push(item2.id);
                }
            });

            fadeIn3.forEach((item3) => {
                const itemRect3 = item3.getBoundingClientRect();
                if (itemRect3.top < window.innerHeight && itemRect3.bottom >= 0) {
                    updatedInViewItems3.push(item3.id);
                }
            });

            fadeIn4.forEach((item4) => {
                const itemRect4 = item4.getBoundingClientRect();
                if (itemRect4.top < window.innerHeight && itemRect4.bottom >= 0) {
                    updatedInViewItems4.push(item4.id);
                }
            });

            fadeIn5.forEach((item5) => {
                const itemRect5 = item5.getBoundingClientRect();
                if (itemRect5.top < window.innerHeight && itemRect5.bottom >= 0) {
                    updatedInViewItems5.push(item5.id);
                }
            });

            setInViewItems2(updatedInViewItems2);
            setInViewItems3(updatedInViewItems3);
            setInViewItems4(updatedInViewItems4);
            setInViewItems5(updatedInViewItems5);
        };

        // 스크롤 이벤트 리스너 등록
        window.addEventListener("scroll", handleScroll);

        // 컴포넌트가 언마운트되면 이벤트 리스너 제거
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // 클릭된 아이콘에 대한 처리
    const handleIconClick = (iconIndex) => {
        // 각 아이콘에 대한 링크를 정의합니다.
        const iconLinks = {
            0: "/https://www.heerim.com/kr/project/project_list.php?cate=1",
            1: "/https://www.heerim.com/kr/project/project_list.php?cate=2",
            2: "/https://www.heerim.com/kr/project/project_list.php?cate=3",
            3: "/https://www.heerim.com/kr/project/project_list.php?cate=4",
            4: "/https://www.heerim.com/kr/project/project_list.php?cate=5",
            5: "/https://www.heerim.com/kr/project/project_list.php?cate=6",
            6: "/https://www.heerim.com/kr/project/project_list.php?cate=7",
            7: "/https://www.heerim.com/kr/project/project_list.php?cate=8",
            8: "/https://www.heerim.com/kr/project/project_list.php?cate=9",
            9: "/https://www.heerim.com/kr/project/project_list.php?cate=10",
            // 다른 아이콘들에 대한 링크를 추가하세요
        };

        // 클릭된 아이콘에 해당하는 링크로 이동합니다.
        const link = iconLinks[iconIndex];
        if (link) {
            window.location.href = link;
        }
    };

    // 아이콘에 대한 설명을 반환
    const getIconDescription = (iconIndex) => {
        // 각 아이콘에 대한 설명을 정의합니다.
        const iconDescriptions = {
            0: "Aviation Transportation",
            1: "Remodeling",
            2: "Urban Design Landscape Design",
            3: "Education Science Technology",
            4: "Residential",
            5: "Interior Design",
            6: "Healthcare",
            7: "Office Headquarters",
            8: "Sports",
            9: "Broadcasting",
            // 다른 아이콘들에 대한 설명을 추가하세요
        };

        // 클릭된 아이콘에 해당하는 설명을 반환합니다.
        return iconDescriptions[iconIndex] || "";
    };

    useEffect(() => {
        setLoading(true);
        console.log(router.query)
        if (!(
            lang == 'kr' ||
            lang == 'en' ||
            !lang
        )) {
            router.push('/404')
        } else {
            setLoading(false);
        }
    }, [router.query])

    useEffect(() => {
        if (!loading) {
            window.addEventListener("wheel", handleScroll, { passive: false });

            // Intersection Observer를 사용하여 section1이 화면에 나타나는지 감시합니다.
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5, // 섹션 1이 화면에 50% 이상 들어올 때 이벤트 발생
            };

            const handleIntersection = (entries) => {
                if (entries[0].isIntersecting) {
                    videoRef.current.play(); // section1이 화면에 나타나면 비디오 재생
                } else {
                    videoRef.current.pause(); // section1이 화면에서 벗어나면 비디오 일시 정지
                }
            };

            const observer = new IntersectionObserver(handleIntersection, options);
            observer.observe(sectionRefs.current[0]);

            // 컴포넌트가 언마운트될 때 이벤트 리스너 및 Intersection Observer를 제거합니다.
            return () => {
                window.removeEventListener("wheel", handleScroll);
                observer.disconnect();
            };
        }


        // 스크롤 이벤트를 추가합니다.

    }, [activeSection, loading]);

    const handleScroll = (e) => {
        // 스크롤 이벤트를 중지합니다.
        e.preventDefault();

        // 현재 화면의 중앙 위치를 계산합니다.
        const screenHeight = window.innerHeight;
        const screenCenter = screenHeight / 2;

        // 마우스 휠 방향에 따라 이동할 섹션을 결정합니다.
        let newActiveSection = activeSection;
        if (e.deltaY > 0 && activeSection < sections.length - 1) {
            newActiveSection = activeSection + 1;
        } else if (e.deltaY < 0 && activeSection > 0) {
            newActiveSection = activeSection - 1;
        }

        // 새로운 활성 섹션을 설정합니다.
        setActiveSection(newActiveSection);

        // 화면을 스크롤하여 새로운 섹션의 가운데로 이동합니다.
        const element = sectionRefs.current[newActiveSection];
        if (element) {
            const sectionTop = element.offsetTop;
            const sectionHeight = element.clientHeight;
            const scrollToY = sectionTop + sectionHeight / 2 - screenCenter;
            window.scrollTo({ top: scrollToY, behavior: "smooth" });

            // section1로 돌아온 경우
            if (newActiveSection === 0) {
                videoRef.current.play(); // 비디오 재생
            } else {
                videoRef.current.pause(); // 비디오 일시 정지
                videoRef.current.currentTime = 0; // 비디오를 처음으로 되감깁니다.
            }

        }

        // section4 이후의 섹션에서는 스크롤 이벤트를 무시합니다.
        if (newActiveSection >= 3) {
            return;
        }
    };


    // 이전 아이콘 표시 함수
    const showPreviousIcons = () => {
        const newIconIndexes = iconIndexes.map((index) => {
            let newIndex = index - 1;
            if (newIndex < 0) {
                newIndex = totalIcons - 1;
            }
            return newIndex;
        });
        setIconIndexes(newIconIndexes);
    };

    // 다음 아이콘 표시 함수
    const showNextIcons = () => {
        const newIconIndexes = iconIndexes.map((index) => {
            let newIndex = index + 1;
            if (newIndex >= totalIcons) {
                newIndex = 0;
            }
            return newIndex;
        });
        setIconIndexes(newIconIndexes);
    };

    // 이미지 변경 함수
    const handleImageHover = (e, imageSrc) => {
        e.preventDefault(); // 이벤트 중지
        setHoveredImage(imageSrc); // 호버된 이미지 업데이트
    };

    // 이미지 복원 함수
    const restoreOriginalImage = () => {
        setHoveredImage(""); // 호버 이미지를 초기화하여 원래 이미지로 돌아감
    };

    // 검색어 입력 핸들러
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 검색 실행 함수
    const handleSearch = () => {
        // 여기에서 검색을 실행하거나 필요한 로직을 추가하세요.
        console.log("Searching for:", searchQuery);
        // 검색 이후에는 검색 창을 닫을 수 있도록
        closeSearch();
    };
    return (
        <>
            {!loading &&
                <>
                    <div>
                        {sections.map((section, index) => (
                            <div
                                key={section}
                                id={section}
                                className={`section ${index === activeSection ? "active-section" : ""}`}
                                ref={(el) => (sectionRefs.current[index] = el)}
                            >
                                {index === 0 ? (
                                    <div className="video-container">
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="fullscreen-video"
                                            ref={videoRef}
                                        >
                                            <source src="/video/video.mp4" type="video/mp4" />
                                            {langJson[lang]?.YOUR_BRO}
                                        </video>
                                    </div>
                                ) : index === 1 ? (
                                    <div className="text-overlay-section2">
                                        {/* 노란색 배경에 녹색 박스 모양의 텍스트 박스와 소제목, 설명 */}
                                        <div className="green-box">
                                            <p className="green-box-text">WHO WE ARE</p>
                                        </div>
                                        <div className="subtitle" > {langJson[lang]?.WORLD_LEADING}</div>
                                        <div className="subtitle"> {langJson[lang]?.ARCHITECTURE}</div>
                                        <div className="description" style={{ marginTop: '2vw' }}>{langJson[lang]?.INNOVATIONS}</div>
                                        <div className="description" style={{ marginTop: '0.5vw' }}>{langJson[lang]?.DESIGN_TOMORROW}</div>
                                        {/* 주제와 설명 */}
                                        <div className="topics-container">
                                            <div className="topic">
                                                <h2 className='topic-title'>History of Heerim</h2>
                                                <p className='topic-number'>50+</p>
                                            </div>
                                            <div className="topic">
                                                <h2 className='topic-title'>Branch offices</h2>
                                                <p className='topic-number'>15</p>
                                            </div>
                                            <div className="topic">
                                                <h2 className='topic-title'>Professional Employees</h2>
                                                <p className='topic-number'>1,400+</p>
                                            </div>
                                            <div className="topic">
                                                <h2 className='topic-title'>Overseas Projects</h2>
                                                <p className='topic-number'>300+</p>
                                            </div>
                                            <div className="topic">
                                                <h2 className='topic-title'>World Ranking (WA2023)</h2>
                                                <p className='topic-number'>8</p>
                                            </div>
                                        </div>
                                        <div className="icon-container">
                                            {/* 이전 버튼 */}
                                            <button className="prev-button" onClick={showPreviousIcons}>
                                                <div className="button-inner">
                                                    <span className="leftarrow">&#5130;</span> {/* 왼쪽 화살표 */}
                                                </div>
                                            </button>
                                            {/* 아이콘 내용 */}
                                            {iconIndexes.map((iconIndex) => (
                                                <button
                                                    key={`icon-${iconIndex}`}
                                                    className="section2-icon"
                                                    onClick={() => handleIconClick(iconIndex)}
                                                >
                                                    <img
                                                        src={`/icon/${iconIndex}.png`}
                                                        alt={`Icon ${iconIndex}`}
                                                        width="100"
                                                        height="100"
                                                    />
                                                    <div className="section2icon-description">
                                                        {/* 아이콘에 대한 설명 */}
                                                        {getIconDescription(iconIndex)}
                                                    </div>
                                                </button>
                                            ))}
                                            {/* 다음 버튼 */}
                                            <button className="next-button" onClick={showNextIcons}>
                                                <div className="button-inner">
                                                    <span className="rightarrow">&#5125;</span> {/* 오른쪽 화살표 */}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                ) : index === 2 ? (
                                    <div className={`text-overlay`}>
                                        <div className="project-box">
                                            <p className="project-text">PROJECT</p>
                                        </div>
                                        <div className="title"> Heerim's Latest Selected Works
                                            <button className="read-more-button" onClick={() => { window.location.href = "/404"; }}>
                                                <span className="read-more-text">Read more</span>
                                                <span className="arrow-icon">→</span>
                                            </button>
                                        </div>
                                        <div class="image-container">
                                            <a class="image-button" href="/404" data-image="/image/image12.jpg" onMouseEnter={(e) => handleImageHover(e, "/image/image12.jpg")} onMouseLeave={restoreOriginalImage}>
                                                <img src={hoveredImage || "/image/image11.jpg"} />
                                            </a>
                                            <a class="image-button" href="/404" data-image="/image/image22.jpg" onMouseEnter={(e) => handleImageHover(e, "/image/image22.jpg")} onMouseLeave={restoreOriginalImage}>
                                                <img src={hoveredImage || "/image/image21.jpg"} />
                                            </a>
                                            <a class="image-button" href="/404" data-image="/image/image32.jpg" onMouseEnter={(e) => handleImageHover(e, "/image/image32.jpg")} onMouseLeave={restoreOriginalImage}>
                                                <img src={hoveredImage || "/image/image31.jpg"} />
                                            </a>
                                            <a class="image-button" href="/404" data-image="/image/image42.jpg" onMouseEnter={(e) => handleImageHover(e, "/image/image42.jpg")} onMouseLeave={restoreOriginalImage}>
                                                <img src={hoveredImage || "/image/image41.jpg"} />
                                            </a>
                                        </div>
                                    </div>
                                ) : index === 3 ? (
                                    <div className="section4">
                                        {/* 뉴스 아이템 리스트 */}
                                        <div className="news-list">
                                            {/* 첫 번째 행 */}
                                            <div className="news-row">
                                                {/* 뉴스 아이템 1 */}
                                                <a href="/404" className={`news-item ${inViewItems4.includes("") ? "in-view" : ""}`}>
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <h3 className="news-title">{langJson[lang]?.INTERNATIONAL}
                                                    </h3>
                                                    <p className="news-date">2023-10-11</p>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" style={{ marginLeft: "20px", color: "orange", fontWeight: "bold" }}>→</span>
                                                </a>
                                                {/* 뉴스 아이템 2 */}
                                                <a href="/404" className={`news-item ${inViewItems4.includes("") ? "in-view" : ""}`} >
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <h3 className="news-title">{langJson[lang]?.GYEONGGI}
                                                    </h3>
                                                    <p className="news-date">2023-10-02</p>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" style={{ marginLeft: "20px", color: "orange", fontWeight: "bold" }}>→</span>
                                                </a>
                                                {/* 뉴스 아이템 3 */}
                                                <a href="/404" className={`news-item ${inViewItems4.includes("") ? "in-view" : ""}`} >
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <h3 className="news-title">{langJson[lang]?.KOREA}
                                                    </h3>
                                                    <p className="news-date">2023-09-11</p>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" style={{ marginLeft: "20px", color: "orange", fontWeight: "bold" }}>→</span>
                                                </a>
                                            </div>
                                            {/* 두 번째 행 */}
                                            <div className="news-row">
                                                {/* 뉴스 아이템 4 */}
                                                <a href="/404" className={`news-item ${inViewItems4.includes("") ? "in-view" : ""}`} >
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <h3 className="news-title">International Architecture Awards 2023
                                                    </h3>
                                                    <p className="news-date">2023-08-21</p>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" style={{ marginLeft: "20px", color: "orange", fontWeight: "bold" }}>→</span>
                                                </a>
                                                {/* 뉴스 아이템 5 */}
                                                <a href="/404" className={`news-item ${inViewItems4.includes("") ? "in-view" : ""}`} >
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <h3 className="news-title">Prix Versailles 2022, Special Prize Exterior(Sports)
                                                    </h3>
                                                    <p className="news-date">2023-01-13</p>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" style={{ marginLeft: "20px", color: "orange", fontWeight: "bold" }}>→</span>
                                                </a>
                                                {/* 뉴스 아이템 6 */}
                                                <a href="/404" className={`news-item ${inViewItems4.includes("") ? "in-view" : ""}`}>
                                                    <div className="news-box">
                                                        <p className="news-text">News</p>
                                                    </div>
                                                    <h3 className="news-title">{langJson[lang]?.MINISTRY_OF_LAND}
                                                    </h3>
                                                    <p className="news-date">2022-12-11</p>
                                                    <span className="news-more-link"> Read more</span>
                                                    <span className="arrow-icon" style={{ marginLeft: "20px", color: "orange", fontWeight: "bold" }}>→</span>
                                                </a>
                                            </div>
                                        </div>
                                        {/* 유튜브 액자 버튼 */}
                                        <div className={`youtube-button-container ${inViewItems4.includes("") ? "in-view" : ""}`}>
                                            {/* 유튜브1 버튼 */}
                                            <a className="youtube-button" href="https://www.youtube.com/watch?v=OLrv8OGTUnQ" target="_blank" rel="noopener noreferrer">
                                                <img src="/image/youtube1.jpg" alt="youtube1 Image" />
                                            </a>
                                            {/* 유튜브2 버튼 */}
                                            <a className="youtube-button" style={{ marginLeft: "35px" }} href="https://www.youtube.com/watch?v=REof-nC8Ck8&feature=youtu.be" target="_blank" rel="noopener noreferrer">
                                                <img src="/image/youtube2.jpg" alt="youtube2 Image" />
                                            </a>
                                            {/* 유튜브3 버튼 */}
                                            <a className="youtube-button" style={{ marginLeft: "35px" }} href="https://www.youtube.com/watch?v=Lu8uHwNpHEQ" target="_blank" rel="noopener noreferrer">
                                                <img src="/image/youtube3.jpg" alt="youtube3 Image" />
                                            </a>
                                            {/* 유튜브4 버튼 */}
                                            <a className="youtube-button" style={{ marginLeft: "35px" }} href="https://www.youtube.com/watch?v=B9FQ3Cz0agM&feature=youtu.be" target="_blank" rel="noopener noreferrer">
                                                <img src="/image/youtube4.jpg" alt="youtube4 Image" />
                                            </a>
                                        </div>
                                        <button className="youtube-more-button" onClick={() => { window.location.href = "/404"; }}>
                                            <span className="news-more-link">Read more</span>
                                            <span className="arrow-icon" style={{ marginLeft: "20px", color: "orange", fontWeight: "bold" }}>→</span>
                                        </button>
                                    </div>
                                ) : index === 4 ? (
                                    <div className="section4">
                                        <div className="searchheerim-container">
                                            <span className={`search-title ${inViewItems5.includes("") ? "in-view" : ""}`}>Search
                                            </span>
                                            <span className={`search-title2 ${inViewItems5.includes("") ? "in-view" : ""}`} style={{ marginLeft: "10px" }}>heerim.com
                                            </span>
                                            <p className={`searchsub ${inViewItems5.includes("") ? "in-view" : ""}`}>Creative Leadership of Heerim designs the new future never experienced before.</p>
                                            <div className="searchheerim">
                                                <input
                                                    className={`searchheerim-input ${inViewItems5.includes("") ? "in-view" : ""}`}
                                                    type="text"
                                                    placeholder="Type here"
                                                    value={searchQuery}
                                                    onChange={handleSearchInputChange} // 검색 입력란 스타일 추가
                                                />
                                                <a href="/link-to-search" style={{ borderBottom: "5px solid white" }} onClick={() => { window.location.href = "/404"; }}>
                                                    <button onClick={handleSearch} className={`searchheerim-button"${inViewItems5.includes("") ? "in-view" : ""}`}>
                                                        Search
                                                        <img src="/icon/search.png" alt="Search Icon" width="40" height="40" />
                                                    </button>
                                                </a>
                                            </div>
                                            <div className={`searchtag-keywords ${inViewItems5.includes("") ? "in-view" : ""}`}>
                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/LaLuna">#LaLuna</Link></button>
                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/DCM">#DCM</Link></button>
                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Pangyo">#Pangyo</Link></button>
                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Cheongna">#Cheongna</Link></button>
                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Azerbaijan">#Azerbaijan</Link></button>
                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Vietnam">#Vietnam</Link></button>
                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Awards">#Awards</Link></button>
                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Metagallery">#Metagallery</Link></button>
                                                <button className="searchtag-button" onClick={() => { window.location.reload() }}><Link href="/Residential">#Residential</Link></button>
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <div className="seoulhqsupport">
                                                <span className="seoulhq">SEOUL HQ
                                                </span>
                                                <span className="support">SUPPORT
                                                </span>
                                                <span className="iconbottom">
                                                    {/* 인스타그램 버튼 */}
                                                    <a className="icon-bottom" href="https://www.instagram.com/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                                                        <img src="/icon/instagram.svg" alt="Instagram Icon" width="40" height="40" />
                                                    </a>
                                                    {/* 유튜브 버튼 */}
                                                    <a className="icon-bottom" style={{ marginLeft: "35px" }} href="https://www.youtube.com/channel/UCPwQIrf17KFyqvXeq8NVY_Q" target="_blank" rel="noopener noreferrer">
                                                        <img src="/icon/youtube.svg" alt="YouTube Icon" width="40" height="40" />
                                                    </a>
                                                    {/* 핀터레스트 버튼 */}
                                                    <a className="icon-bottom" style={{ marginLeft: "35px" }} href="https://www.pinterest.co.kr/heerim_architects_official/" target="_blank" rel="noopener noreferrer">
                                                        <img src="/icon/pinterest.svg" alt="Pinterest Icon" width="40" height="40" />
                                                    </a>
                                                </span>
                                            </div>
                                            <div className="hq">
                                                <div className="hq-container">
                                                    <div className="address">
                                                        <div className="hq1">Address </div>
                                                        <div className="hq1">Tel</div>
                                                    </div>
                                                </div>
                                                <div className="hq-container">
                                                    <div className="address">
                                                        <div className="hq2">{langJson[lang]?.ADDRESS}</div>
                                                        <div className="hq2">+82-23410-9000</div>
                                                        <div className="hq2">+82-2-3490-8500 (International call)</div>
                                                    </div>
                                                </div>
                                                <div className="hq-container">
                                                    <div className="address">
                                                        <div className="hq3">General Inquiries </div>
                                                        <div className="hq3">Career</div>
                                                        <div className="hq3">About Reporting </div>
                                                        <div className="hq3">Misconduct</div>
                                                    </div>
                                                </div>
                                                <div className="hq-container">
                                                    <div className="address">
                                                        <div className="hq4">webmaster@heerim.com</div>
                                                        <div className="hq4">recruit@heerim.com</div>
                                                        <div className="hq4">hot_line_em@heerim.com</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="copyright">
                                                <div className="reserved">
                                                    © 2023. Heerim Architects & Planners Co., Ltd. All rights reserved
                                                </div>
                                                <a className="Newsletter-buttons" href="https://www.heerim.com/kr/etc/newsletter_application.php" target="_blank" rel="noopener noreferrer">
                                                    <div className="Newsletterbutton">
                                                        <img src="/icon/file.svg" alt="Newsletter Icon" />
                                                        <a> Newsletter Application </a>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>{section}</div>
                                )
                                }
                            </div>
                        ))}
                    </div>
                </>}

        </>
    );
};
Home.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Home;
