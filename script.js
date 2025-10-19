// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    initTypingEffect();
    initLanguageSwitcher();
    initVisitCounter();
    initResumeDownload();
    initParticleBackground();
    initMouseTrail();
    initThemeToggle();
    initGallery();
    initImageProtection();
});

// 导航栏功能
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端菜单切换
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // 点击导航链接时关闭菜单
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 高亮当前导航项
    window.addEventListener('scroll', highlightCurrentSection);
}

// 高亮当前导航项
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 平滑滚动
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 为技能条添加动画
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.about-content, .skill-category, .project-card, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 观察技能条
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0';
        observer.observe(bar);
    });
}

// 技能条动画
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && bar.style.width === '0px') {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // 初始检查
}

// 联系表单功能
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // 简单的表单验证
            if (!name || !email || !subject || !message) {
                showNotification('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // 模拟发送邮件
            showNotification('消息发送中...', 'info');
            
            // 模拟异步发送
            setTimeout(() => {
                showNotification('消息发送成功！我会尽快回复您。', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知功能
function showNotification(message, type = 'info') {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // 根据类型设置背景色
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 打字机效果
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const currentLang = localStorage.getItem('language') || 'en';
    const textToType = currentLang === 'zh' ? '你好，我是申一帆' : 'Hello, I am ifshen2002';
    
    // 只在首次加载时执行
    let hasTyped = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasTyped) {
                hasTyped = true;
                typeWriter(heroTitle, textToType, 100, currentLang);
            }
        });
    });
    
    observer.observe(heroTitle);
}

function typeWriter(element, text, speed, lang) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // 打字完成后恢复原始内容
            setTimeout(() => {
                if (lang === 'zh') {
                    element.innerHTML = '你好，我是 <span class="highlight">申一帆</span>';
                } else {
                    element.innerHTML = 'Hello, I am <span class="highlight">ifshen2002</span>';
                }
            }, 1000);
        }
    }
    
    type();
}

// 页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 返回顶部按钮
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // 点击返回顶部
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 悬停效果
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#1d4ed8';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#2563eb';
    });
}

// 初始化返回顶部按钮
createBackToTopButton();

// 项目卡片悬停效果
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 技能条悬停效果
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.transform = 'scaleY(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const progressBar = this.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.transform = 'scaleY(1)';
            }
        });
    });
});

// 性能优化：节流函数
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用节流优化滚动事件
const throttledScrollHandler = throttle(function() {
    highlightCurrentSection();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// 预加载关键资源
function preloadResources() {
    const criticalImages = [
        // 这里可以添加需要预加载的图片
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面显示时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 可以在这里添加错误报告逻辑
});

// 语言切换功能
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'en';
    
    // 设置初始语言
    setLanguage(currentLang);
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
}

function setLanguage(lang) {
    // 更新HTML lang属性
    document.getElementById('html-lang').setAttribute('lang', lang);
    
    // 更新所有带有data属性的元素
    const elements = document.querySelectorAll('[data-en][data-zh]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // 更新页面标题和描述
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    
    if (title) {
        const titleText = title.getAttribute(`data-${lang}`);
        if (titleText) {
            title.textContent = titleText;
        }
    }
    
    if (description) {
        const descText = description.getAttribute(`data-${lang}`);
        if (descText) {
            description.setAttribute('content', descText);
        }
    }
    
    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // 更新标题的打字机效果
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const textToType = lang === 'zh' ? '你好，我是申一帆' : 'Hello, I am ifshen2002';
        typeWriter(heroTitle, textToType, 100, lang);
    }
}

// 访问量统计功能
function initVisitCounter() {
    // 使用本地计数作为备用
    let localCount = localStorage.getItem('visitCount') || 0;
    localCount = parseInt(localCount) + 1;
    localStorage.setItem('visitCount', localCount);
    
    // 显示本地计数
    const counterElement = document.getElementById('visit-count');
    if (counterElement) {
        counterElement.textContent = localCount.toLocaleString();
    }
    
    // 尝试使用CountAPI
    fetch('https://api.countapi.xyz/hit/ifshen2002profile/visits')
        .then(response => response.json())
        .then(data => {
            if (data.value && data.value > 0) {
                counterElement.textContent = data.value.toLocaleString();
            }
        })
        .catch(error => {
            console.log('CountAPI失败，使用本地统计');
        });
}


// 简历下载功能
function initResumeDownload() {
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPasswordModal();
        });
    }
}

function showPasswordModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'password-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    // 创建模态框内容
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 90%;
        text-align: center;
    `;
    
    // 获取当前语言
    const currentLang = localStorage.getItem('language') || 'en';
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #1f2937;">${currentLang === 'zh' ? '简历下载' : 'Resume Download'}</h3>
        <p style="margin-bottom: 1rem; color: #6b7280; font-size: 0.9rem;">
            ${currentLang === 'zh' ? '请输入密码下载简历' : 'Please enter password to download resume'}
        </p>
        <input type="password" id="password-input" placeholder="${currentLang === 'zh' ? '密码' : 'Password'}" 
               style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; margin-bottom: 1rem; font-size: 1rem;">
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button id="download-btn" style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                ${currentLang === 'zh' ? '下载' : 'Download'}
            </button>
            <button id="cancel-btn" style="padding: 0.75rem 1.5rem; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                ${currentLang === 'zh' ? '取消' : 'Cancel'}
            </button>
        </div>
        <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.8rem;">
            ${currentLang === 'zh' ? '如需密码，请联系 ifshen2002@gmail.com' : 'For password, please contact ifshen2002@gmail.com'}
        </p>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // 添加事件监听
    const passwordInput = modalContent.querySelector('#password-input');
    const downloadBtn = modalContent.querySelector('#download-btn');
    const cancelBtn = modalContent.querySelector('#cancel-btn');
    
    // 取消按钮
    cancelBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // 下载按钮
    downloadBtn.addEventListener('click', function() {
        const password = passwordInput.value;
        if (password === '2002') {
            downloadResume(currentLang);
            updateDownloadCount();
            document.body.removeChild(modal);
            showNotification(
                currentLang === 'zh' ? '简历下载成功！' : 'Resume downloaded successfully!', 
                'success'
            );
        } else {
            showNotification(
                currentLang === 'zh' ? '密码错误，请重试' : 'Wrong password, please try again', 
                'error'
            );
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
    
    // 回车键提交
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            downloadBtn.click();
        }
    });
    
    // 自动聚焦到输入框
    setTimeout(() => {
        passwordInput.focus();
    }, 100);
}

function downloadResume(lang) {
    // 根据语言选择不同的简历文件
    const filename = lang === 'zh' ? 'YIFAN-简历中文.zip' : 'YIFAN-Resume.zip';
    const currentLang = localStorage.getItem('language') || 'en';
    
    // 显示下载提示
    showNotification(
        currentLang === 'zh' ? '正在准备下载...' : 'Preparing download...', 
        'info'
    );
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = `resumes/${filename}`;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 显示密码提示弹窗
    setTimeout(() => {
        showPasswordHintModal(currentLang);
    }, 500);
    
    // 延迟显示成功消息
    setTimeout(() => {
        showNotification(
            currentLang === 'zh' ? '简历下载成功！' : 'Resume downloaded successfully!', 
            'success'
        );
    }, 1000);
}

function showPasswordHintModal(lang) {
    // 创建密码提示模态框
    const modal = document.createElement('div');
    modal.className = 'password-hint-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    // 创建模态框内容
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        max-width: 450px;
        width: 90%;
        text-align: center;
    `;
    
    modalContent.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <i class="fas fa-lock" style="font-size: 3rem; color: #2563eb; margin-bottom: 1rem;"></i>
            <h3 style="margin-bottom: 1rem; color: #1f2937;">
                ${lang === 'zh' ? '文件已加密' : 'File is Encrypted'}
            </h3>
            <p style="margin-bottom: 1rem; color: #6b7280; line-height: 1.6;">
                ${lang === 'zh' ? '下载的简历文件已加密保护，需要密码才能打开。' : 'The downloaded resume file is encrypted and requires a password to open.'}
            </p>
            <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p style="margin: 0; color: #374151; font-weight: 600;">
                    ${lang === 'zh' ? '解压密码：2002' : 'Extraction Password: 2002'}
                </p>
            </div>
            <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.9rem;">
                ${lang === 'zh' ? '如需密码，请联系管理员：' : 'For password assistance, contact admin:'}
                <br>
                <strong style="color: #2563eb;">ifshen2002@gmail.com</strong>
            </p>
        </div>
        <button id="close-hint-btn" style="padding: 0.75rem 2rem; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
            ${lang === 'zh' ? '我知道了' : 'Got it'}
        </button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // 添加事件监听
    const closeBtn = modalContent.querySelector('#close-hint-btn');
    
    // 关闭按钮
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // ESC键关闭
    const handleEsc = function(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

function updateDownloadCount() {
    // 更新下载次数统计
    let downloadCount = localStorage.getItem('resumeDownloadCount') || 0;
    downloadCount = parseInt(downloadCount) + 1;
    localStorage.setItem('resumeDownloadCount', downloadCount);
    
    // 可以在这里添加其他统计逻辑，比如发送到服务器
    console.log(`Resume downloaded ${downloadCount} times`);
}

// 粒子背景动画
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.6;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };
    
    // 调整画布大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // 边界检测
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // 鼠标交互
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.vx += dx * 0.0001;
                this.vy += dy * 0.0001;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // 初始化粒子
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // 绘制连线
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 - distance / 1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    // 鼠标移动事件
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // 窗口大小改变
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // 初始化
    resizeCanvas();
    initParticles();
    animate();
}

// 鼠标跟随光效
function initMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // 清理旧的光点
        const now = Date.now();
        for (let i = trail.length - 1; i >= 0; i--) {
            if (now - trail[i].time > 1000) {
                trail.splice(i, 1);
            }
        }
        
        // 绘制光效
        drawTrail();
    });
    
    function drawTrail() {
        // 移除旧的光效元素
        document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
        
        trail.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.className = 'mouse-trail';
            dot.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(37, 99, 235, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                opacity: ${(index + 1) / trail.length};
                transition: opacity 0.1s ease;
            `;
            document.body.appendChild(dot);
            
            // 自动移除
            setTimeout(() => {
                if (dot.parentNode) {
                    dot.parentNode.removeChild(dot);
                }
            }, 100);
        });
    }
}

// 主题切换功能
function initThemeToggle() {
    // 创建主题切换按钮
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        color: #1f2937;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(themeToggle);
    
    // 获取当前主题
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // 更新按钮图标
    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    
    updateThemeIcon(currentTheme);
    
    // 主题切换事件
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // 添加切换动画
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // 悬停效果
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
        themeToggle.style.background = 'rgba(37, 99, 235, 0.1)';
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
        themeToggle.style.background = 'rgba(255, 255, 255, 0.9)';
    });
}

// 画廊功能
function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // 自动检测并显示可用的照片
    checkAndShowAvailablePhotos();
    
    // 筛选功能
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选图片
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // 图片点击需要密码验证
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            showGalleryPasswordModal();
        });
    });
}

// 画廊密码验证模态框
function showGalleryPasswordModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'gallery-password-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    // 创建模态框内容
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 90%;
        text-align: center;
    `;
    
    // 获取当前语言
    const currentLang = localStorage.getItem('language') || 'en';
    
    modalContent.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <i class="fas fa-images" style="font-size: 3rem; color: #2563eb; margin-bottom: 1rem;"></i>
            <h3 style="margin-bottom: 1rem; color: #1f2937;">
                ${currentLang === 'zh' ? '个人风采查看' : 'Personal Gallery Access'}
            </h3>
            <p style="margin-bottom: 1rem; color: #6b7280; font-size: 0.9rem;">
                ${currentLang === 'zh' ? '请输入密码查看个人风采照片' : 'Please enter password to view personal gallery'}
            </p>
            <input type="password" id="gallery-password-input" placeholder="${currentLang === 'zh' ? '密码' : 'Password'}" 
                   style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; margin-bottom: 1rem; font-size: 1rem;">
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="gallery-access-btn" style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    ${currentLang === 'zh' ? '查看' : 'View'}
                </button>
                <button id="gallery-cancel-btn" style="padding: 0.75rem 1.5rem; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    ${currentLang === 'zh' ? '取消' : 'Cancel'}
                </button>
            </div>
            <p style="margin-top: 1rem; color: #9ca3af; font-size: 0.8rem;">
                ${currentLang === 'zh' ? '如需密码，请联系 ifshen2002@gmail.com' : 'For password, please contact ifshen2002@gmail.com'}
            </p>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // 添加事件监听
    const passwordInput = modalContent.querySelector('#gallery-password-input');
    const accessBtn = modalContent.querySelector('#gallery-access-btn');
    const cancelBtn = modalContent.querySelector('#gallery-cancel-btn');
    
    // 取消按钮
    cancelBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // 访问按钮
    accessBtn.addEventListener('click', function() {
        const password = passwordInput.value;
        if (password === '2002') {
            document.body.removeChild(modal);
            showGalleryAccess();
            showNotification(
                currentLang === 'zh' ? '密码正确，可以查看照片了！' : 'Password correct, you can now view photos!', 
                'success'
            );
        } else {
            showNotification(
                currentLang === 'zh' ? '密码错误，请重试' : 'Wrong password, please try again', 
                'error'
            );
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
    
    // 回车键提交
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            accessBtn.click();
        }
    });
    
    // 自动聚焦到输入框
    setTimeout(() => {
        passwordInput.focus();
    }, 100);
}

// 显示画廊访问界面
function showGalleryAccess() {
    // 移除密码保护
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-info h3').textContent;
            const description = this.querySelector('.gallery-info p').textContent;
            
            showImageModal(img.src, title, description);
        });
    });
    
    // 显示访问提示
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        const accessNotice = document.createElement('div');
        accessNotice.style.cssText = `
            background: rgba(37, 99, 235, 0.1);
            border: 1px solid rgba(37, 99, 235, 0.3);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 2rem;
            text-align: center;
            color: #2563eb;
            font-weight: 500;
        `;
        accessNotice.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span data-en="Gallery access granted! Click on photos to view them in full size." data-zh="画廊访问已授权！点击照片可查看大图。">
                Gallery access granted! Click on photos to view them in full size.
            </span>
        `;
        
        const container = gallerySection.querySelector('.container');
        if (container) {
            container.insertBefore(accessNotice, container.querySelector('.gallery-grid'));
        }
    }
}

// 检测并显示可用的照片
function checkAndShowAvailablePhotos() {
    const placeholderItems = document.querySelectorAll('.gallery-item.placeholder');
    
    placeholderItems.forEach(item => {
        const img = item.querySelector('img');
        const imageSrc = img.src;
        
        // 检查图片是否存在
        const testImg = new Image();
        testImg.onload = function() {
            // 图片存在，显示这个项目
            item.style.display = 'block';
            item.classList.remove('placeholder');
            item.setAttribute('data-category', 'personal');
        };
        testImg.onerror = function() {
            // 图片不存在，保持隐藏
            item.style.display = 'none';
        };
        testImg.src = imageSrc;
    });
}

// 图片放大模态框
function showImageModal(imageSrc, title, description) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <img src="${imageSrc}" alt="${title}" style="max-width: 100%; max-height: 100%; border-radius: 10px;">
        <div style="position: absolute; bottom: -60px; left: 0; right: 0; text-align: center; color: white;">
            <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">${title}</h3>
            <p style="opacity: 0.8; font-size: 0.9rem;">${description}</p>
        </div>
        <button id="close-image-modal" style="position: absolute; top: -40px; right: 0; background: rgba(255, 255, 255, 0.2); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.2rem;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // 显示动画
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // 关闭功能
    const closeBtn = modalContent.querySelector('#close-image-modal');
    closeBtn.addEventListener('click', closeImageModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // ESC键关闭
    const handleEsc = function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
    
    function closeImageModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// 图片保护功能
function initImageProtection() {
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 禁用拖拽
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 禁用选择
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 禁用F12和开发者工具快捷键
    document.addEventListener('keydown', function(e) {
        // 禁用F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // 禁用Ctrl+Shift+I (开发者工具)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // 禁用Ctrl+U (查看源代码)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        
        // 禁用Ctrl+S (保存)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
    });
    
    // 添加水印保护
    addWatermarkProtection();
}

// 添加水印保护
function addWatermarkProtection() {
    const watermark = document.createElement('div');
    watermark.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            rgba(0, 0, 0, 0.03) 100px,
            rgba(0, 0, 0, 0.03) 200px
        );
        opacity: 0.1;
    `;
    
    // 添加版权信息
    const copyright = document.createElement('div');
    copyright.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        color: rgba(0, 0, 0, 0.3);
        font-size: 12px;
        pointer-events: none;
        z-index: 10000;
    `;
    copyright.textContent = '© 2025 YIFAN SHEN';
    
    document.body.appendChild(watermark);
    document.body.appendChild(copyright);
}

// 控制台欢迎信息
console.log('%c欢迎来到 YIFAN SHEN 的个人主页！', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%c如果您对代码感兴趣，欢迎查看源代码！', 'color: #6b7280; font-size: 14px;');
