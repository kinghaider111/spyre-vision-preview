import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navbar, Footer } from "./components/Layout";
import { SmoothScroll, ScrollToTop, ScrollToTopButton } from "./components/Scroll";
import LoadingScreen from "./components/LoadingScreen";
import { ThemeProvider } from "./components/ThemeProvider";

import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Academy from "./pages/Academy";
import Contact from "./pages/Contact";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
    <Navbar />
    <main className="flex-grow">
      <PageTransition>{children}</PageTransition>
    </main>
    <Footer />
  </div>
);

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [transitionDone, setTransitionDone] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!transitionDone) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [transitionDone]);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <LoadingScreen loading={loading} />
              <AnimatePresence>
                {!loading && (
                  <motion.div
                    key="main-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    onAnimationComplete={() => setTransitionDone(true)}
                  >
                    <ScrollToTopButton />
                    <SmoothScroll>
                      <MainLayout>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/solutions" element={<Solutions />} />
                          <Route path="/academy" element={<Academy />} />
                          <Route path="/academy/course/:id" element={<CourseDetail />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </MainLayout>
                    </SmoothScroll>
                  </motion.div>
                )}
              </AnimatePresence>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
