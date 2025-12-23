document.addEventListener('DOMContentLoaded', function() {
    // 登录/注册标签切换
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', function() {
            switchToLogin();
        });
        
        registerTab.addEventListener('click', function() {
            switchToRegister();
        });
    }
    
    function switchToLogin() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    }
    
    function switchToRegister() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }
    
    // 登录表单验证
    const loginFormElement = document.getElementById('loginFormElement');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const emailError = document.getElementById('loginEmailError');
            const passwordError = document.getElementById('loginPasswordError');
            
            let isValid = true;
            
            // 清空错误信息
            emailError.textContent = '';
            passwordError.textContent = '';
            
            // 邮箱/用户名验证
            if (!email) {
                emailError.textContent = '请输入邮箱或用户名';
                isValid = false;
            }
            
            // 密码验证
            if (!password) {
                passwordError.textContent = '请输入密码';
                isValid = false;
            } else if (password.length < 6) {
                passwordError.textContent = '密码至少6位';
                isValid = false;
            }
            
            if (isValid) {
                // 模拟登录请求
                simulateLogin(email, password);
            }
        });
    }
    
    // 注册表单验证
    const registerFormElement = document.getElementById('registerFormElement');
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('registerUsername').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            const usernameError = document.getElementById('registerUsernameError');
            const emailError = document.getElementById('registerEmailError');
            const passwordError = document.getElementById('registerPasswordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            
            let isValid = true;
            
            // 清空错误信息
            usernameError.textContent = '';
            emailError.textContent = '';
            passwordError.textContent = '';
            confirmPasswordError.textContent = '';
            
            // 用户名验证
            if (!username) {
                usernameError.textContent = '请输入用户名';
                isValid = false;
            } else if (username.length < 3) {
                usernameError.textContent = '用户名至少3个字符';
                isValid = false;
            }
            
            // 邮箱验证
            if (!email) {
                emailError.textContent = '请输入邮箱';
                isValid = false;
            } else if (!isValidEmail(email)) {
                emailError.textContent = '请输入有效的邮箱地址';
                isValid = false;
            }
            
            // 密码验证
            if (!password) {
                passwordError.textContent = '请输入密码';
                isValid = false;
            } else if (password.length < 6) {
                passwordError.textContent = '密码至少6位';
                isValid = false;
            }
            
            // 确认密码验证
            if (!confirmPassword) {
                confirmPasswordError.textContent = '请确认密码';
                isValid = false;
            } else if (password !== confirmPassword) {
                confirmPasswordError.textContent = '两次输入的密码不一致';
                isValid = false;
            }
            
            // 条款同意验证
            if (!agreeTerms) {
                alert('请阅读并同意服务条款和隐私政策');
                isValid = false;
            }
            
            if (isValid) {
                // 模拟注册请求
                simulateRegister(username, email, password);
            }
        });
    }
    
    // 邮箱验证函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 模拟登录
    function simulateLogin(email, password) {
        // 显示加载状态
        const submitBtn = loginFormElement.querySelector('.btn-auth');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '登录中...';
        submitBtn.disabled = true;
        
        // 模拟API请求延迟
        setTimeout(() => {
            // 简单验证模拟
            if (email && password) {
                alert('登录成功！欢迎回来。');
                // 在实际应用中，这里会跳转到用户主页
                // window.location.href = 'dashboard.html';
            } else {
                alert('登录失败，请检查用户名和密码');
            }
            
            // 恢复按钮状态
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    // 模拟注册
    function simulateRegister(username, email, password) {
        // 显示加载状态
        const submitBtn = registerFormElement.querySelector('.btn-auth');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '注册中...';
        submitBtn.disabled = true;
        
        // 模拟API请求延迟
        setTimeout(() => {
            alert(`注册成功！欢迎 ${username}，请使用您的账号登录。`);
            
            // 切换到登录表单
            switchToLogin();
            
            // 恢复按钮状态
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    // 社交登录按钮处理
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'GitHub';
            alert(`即将通过 ${platform} 账号登录`);
        });
    });
    
    // 忘记密码链接
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('请输入您的邮箱地址以重置密码：');
            if (email) {
                alert(`重置密码链接已发送到 ${email}，请查收。`);
            }
        });
    }
});