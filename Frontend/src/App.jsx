import { Routes, Route, Navigate } from 'react-router-dom';
import LanguageSelection   from '@/pages/LanguageSelection/LanguageSelection';
import Home                from '@/pages/Home/Home';
import SignIn              from '@/pages/SignIn/SignIn';
import SignUp              from '@/pages/SignUp/SignUp';
import Dashboard           from '@/pages/Dashboard/Dashboard';
import AuthCallback        from '@/pages/AuthCallback/AuthCallback';
import BusinessPlanInput          from '@/pages/BusinessPlan/BusinessPlanInput';
import BusinessPlanResult         from '@/pages/BusinessPlan/BusinessPlanResult';
import ProductDescriptionInput    from '@/pages/ProductDescription/ProductDescriptionInput';
import ProductDescriptionResult   from '@/pages/ProductDescription/ProductDescriptionResult';
import MyProgress                 from '@/pages/MyProgress/MyProgress';
import About                      from '@/pages/About/About';
import HelpSupport                from '@/pages/HelpSupport/HelpSupport';
import ProtectedRoute      from '@/components/ProtectedRoute/ProtectedRoute';

const Protected = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export default function App() {
  return (
    <Routes>
      <Route path="/"                    element={<LanguageSelection />} />
      <Route path="/home"                element={<Home />} />
      <Route path="/sign-in"             element={<SignIn />} />
      <Route path="/sign-up"             element={<SignUp />} />
      <Route path="/auth/callback"       element={<AuthCallback />} />
      <Route path="/dashboard"           element={<Protected><Dashboard /></Protected>} />
      <Route path="/business-plan"       element={<Protected><BusinessPlanInput /></Protected>} />
      <Route path="/business-plan/result"          element={<Protected><BusinessPlanResult /></Protected>} />
      <Route path="/product-description"            element={<Protected><ProductDescriptionInput /></Protected>} />
      <Route path="/product-description/result"     element={<Protected><ProductDescriptionResult /></Protected>} />
      <Route path="/my-progress"                    element={<Protected><MyProgress /></Protected>} />
      <Route path="/about"                          element={<About />} />
      <Route path="/help-support"                   element={<HelpSupport />} />
      <Route path="*"                               element={<Navigate to="/" replace />} />
    </Routes>
  );
}
