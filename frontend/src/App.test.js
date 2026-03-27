import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import API from './utils/api';

jest.mock('./utils/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const flush = async () => {
  await act(async () => {
    await Promise.resolve();
  });
};

const renderApp = async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(<App />);
  });

  await flush();

  return { container, root };
};

beforeAll(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  window.scrollTo = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.IntersectionObserver = IntersectionObserverMock;
});

beforeEach(() => {
  window.localStorage.clear();
  window.history.pushState({}, '', '/');
  document.body.innerHTML = '';

  API.get.mockImplementation((path) => {
    switch (path) {
      case '/clients':
        return Promise.resolve({ data: { data: [{ name: 'كود كار للسيارات' }, { name: 'اسبتالية' }] } });
      case '/projects':
        return Promise.resolve({
          data: {
            data: [
              { _id: '1', title: 'غزال لإدارة المواقف', description: 'desc', category: 'app', order: 1 },
              { _id: '2', title: 'منصور للذبائح', description: 'desc', category: 'app', order: 2 },
              { _id: '3', title: 'نادي أبها الرياضي', description: 'desc', category: 'web', order: 3 },
            ],
          },
        });
      case '/testimonials':
        return Promise.resolve({
          data: {
            data: [
              { _id: '1', name: 'أ. محمد عراقي', role: 'x', avatar: 'م', youtubeId: 'abc' },
              { _id: '2', name: 'أ. سلطان الفيفي', role: 'x', avatar: 'س', youtubeId: 'def' },
              { _id: '3', name: 'أ. أحمد مفرح', role: 'x', avatar: 'أ', youtubeId: 'ghi' },
            ],
          },
        });
      case '/stats':
        return Promise.resolve({
          data: {
            data: {
              projects: 307,
              workHours: 253440,
              coffeeCups: 73370,
              yearsExperience: 10,
            },
          },
        });
      default:
        return Promise.resolve({ data: { data: [] } });
    }
  });

  API.post.mockResolvedValue({ data: { message: 'Sent successfully' } });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('language and theme toggles update the interface', async () => {
  const { container, root } = await renderApp();

  expect(container.textContent).toContain('خدماتنا');
  expect(document.documentElement.dataset.theme).toBe('light');

  const themeButton = container.querySelector('.nav-theme');
  await act(async () => {
    themeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(document.documentElement.dataset.theme).toBe('dark');

  const englishButton = Array.from(container.querySelectorAll('.language-toggle button')).find((button) => button.textContent === 'EN');
  await act(async () => {
    englishButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  await flush();

  expect(container.textContent).toContain('Services');
  expect(document.documentElement.dir).toBe('ltr');

  await act(async () => {
    root.unmount();
  });
});

test('services nav opens the dedicated pages and keeps project and process interactions working', async () => {
  const { container, root } = await renderApp();
  await flush();

  const servicesToggle = container.querySelector('.nav-link-with-icon');
  expect(servicesToggle).not.toBeNull();
  expect(servicesToggle.getAttribute('aria-expanded')).toBe('false');
  expect(container.querySelectorAll('.testimonial-note.visible').length).toBeGreaterThan(0);

  await act(async () => {
    servicesToggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(servicesToggle.getAttribute('aria-expanded')).toBe('true');

  const websiteServiceButton = Array.from(container.querySelectorAll('.nav-submenu-link')).find((button) =>
    button.textContent.includes('تطوير مواقع الويب')
  );

  expect(websiteServiceButton).not.toBeNull();

  await act(async () => {
    websiteServiceButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  await flush();
  expect(container.textContent).toContain('تطوير مواقع الويب');

  window.history.pushState({}, '', '/');
  await act(async () => {
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await flush();

  const websiteProjectsButton = Array.from(container.querySelectorAll('.projects-tabs-wrap .tab-button')).find((button) =>
    button.textContent.includes('مواقع الويب')
  );

  await act(async () => {
    websiteProjectsButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  await flush();
  expect(container.textContent).toContain('نادي أبها الرياضي');

  const marketingButton = Array.from(container.querySelectorAll('.process-tabs .tab-button')).find((button) =>
    button.textContent.includes('التسويق')
  );

  await act(async () => {
    marketingButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(container.textContent).toContain('فهم السوق');

  await act(async () => {
    root.unmount();
  });
});

test('service detail routes render the dedicated service pages', async () => {
  window.localStorage.setItem('nx_locale', 'en');
  window.history.pushState({}, '', '/services/mobile-applications');

  const { container, root } = await renderApp();

  expect(container.textContent).toContain('Mobile app development');
  expect(container.textContent).toContain('Start your app project');
  expect(container.textContent).toContain('What we fine-tune inside the app');
  expect(container.textContent).toContain('When this service makes sense');
  expect(container.querySelector('.service-phone-stage')).not.toBeNull();

  await act(async () => {
    root.unmount();
  });
});
