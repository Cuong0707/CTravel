import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BsSunFill, BsMoon } from 'react-icons/bs'; // Import icons from Bootstrap

const lightTheme = {
  body: '#ffffff',
  text: '#000000',
  navbar: 'var(--green-50)', // Màu sắc navbar cho chế độ sáng
  footer: 'var(--green-50)',
  // Thêm các biến khác tùy thuộc vào thiết kế của bạn
};

const darkTheme = {
  body: '#2F4F4F',
  text: '#000000',
  navbar: '#6A5ACD', // Mà sắc navbar cho chế độ tối
  footer: '#6A5ACD',
  // Thêm các biến khác tùy thuộc vào thiết kế của bạn
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    // Thêm các thuộc tính CSS khác tùy thuộc vào theme của bạn
  }

  nav {
    background-color: ${(props) => props.theme.navbar};
    color: ${(props) => props.theme.text};
    // Các thuộc tính CSS khác của navbar
  }

  footer {
    background-color: ${(props) => props.theme.navbar};
    color: ${(props) => props.theme.text};
    // Các thuộc tính CSS khác của navbar
  }
`;

const Container = styled.div`
  // CSS của container tùy thuộc vào theme của bạn
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: #2196F3;
    }

    &:focus + span {
      box-shadow: 0 0 1px #2196F3;
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #2196F3;
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  
  .icon {
    position: absolute;
    top: 7px;
    left: 7px;
    color: #f8f9fa;
  }
`;

const DarkModeToggle = () => {

  // Sử dụng useEffect để thiết lập thuộc tính darkMode mỗi khi component được render
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  const [darkMode, setDarkMode] = useState(() => {
    // Kiểm tra xem trong local storage đã có trạng thái dark mode được lưu chưa
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false; // Nếu chưa có, mặc định là false
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode)); // Lưu trạng thái dark mode vào local storage
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <footer>
        <nav>
          <Container>
            <ToggleSwitch>
              <BsSunFill className="icon" /> {/* Bootstrap sun icon*/}
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span></span>
              <BsMoon className="icon" /> {/* Bootstrap moon icon*/}
            </ToggleSwitch>
          </Container>
        </nav>
      </footer>
    </ThemeProvider>
  );
};

export default DarkModeToggle;
