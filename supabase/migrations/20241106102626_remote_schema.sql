CREATE TRIGGER create_user_on_signup AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION create_user_on_signup();

