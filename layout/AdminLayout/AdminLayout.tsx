import React, {
  PropsWithChildren, useCallback, useEffect, useState,
} from 'react'
import { useResizeDetector } from 'react-resize-detector'
import Head from 'next/head'
import Sidebar, { SidebarOverlay } from './Sidebar/Sidebar'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Container } from 'react-bootstrap'
import { useRouter } from "next/router";

export default function AdminLayout({ children }: PropsWithChildren) {


  const navigate = useRouter();
  useEffect(() => {
    let userData = localStorage.getItem('userData');
    if (!userData) {
      navigate.push('/Admin/login?goTo=/Admin')
    }
  }, []);


  // Show status for xs screen
  const [isShowSidebar, setIsShowSidebar] = useState(false)

  // Show status for md screen and above
  const [isShowSidebarMd, setIsShowSidebarMd] = useState(true)

  const toggleIsShowSidebar = () => {
    setIsShowSidebar(!isShowSidebar)
  }

  const toggleIsShowSidebarMd = () => {
    const newValue = !isShowSidebarMd
    localStorage.setItem('isShowSidebarMd', newValue ? 'true' : 'false')
    setIsShowSidebarMd(newValue)
  }

  // Clear and reset sidebar
  const resetIsShowSidebar = () => {
    setIsShowSidebar(false)
  }

  const onResize = useCallback(() => {
    resetIsShowSidebar()
  }, [])

  const { ref } = useResizeDetector({ onResize })

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem('isShowSidebarMd')) {
      setIsShowSidebarMd(localStorage.getItem('isShowSidebarMd') === 'true')
    }
  }, [setIsShowSidebarMd])


  return (
    <>
      <Head>
        <title> املاک امید | داشتبرد‌</title>
        <meta name="description" content="داشتبرد املاک امید" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/admin/css/style.css"/>
      </Head>

      <div ref={ref} className="position-absolute w-100" />

      <Sidebar isShow={isShowSidebar} isShowMd={isShowSidebarMd} />

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header toggleSidebar={toggleIsShowSidebar} toggleSidebarMd={toggleIsShowSidebarMd} />
        <div className="body flex-grow-1 px-3">
          <Container fluid="lg">
            {children}
          </Container>
        </div>
        <Footer />
      </div>

      <SidebarOverlay isShowSidebar={isShowSidebar} toggleSidebar={toggleIsShowSidebar} />
    </>
  )
}
