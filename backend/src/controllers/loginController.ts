import { Context } from 'hono'
import { loginSchemaTeacher, loginSchemaStudent, loginSchemaMajor } from '../schemas/loginSchema'

export const loginController = async (c: Context) => {
  try {
    const type = c.req.param('type')
    const body = await c.req.json()

    switch (type) {
      case 'teacher': {
        const validatedData = loginSchemaTeacher.safeParse(body);
        if (!validatedData.success) {
          return c.json({ success: false, message: 'Invalid credentials' }, 400);
        }
        return c.json({
          success: true,
          message: 'Login successful',
          data: { email: validatedData.data.email }
        }, 200);
      }
      case 'student': {
        const validatedData = loginSchemaStudent.safeParse(body);
        if (!validatedData.success) {
          return c.json({ success: false, message: 'Invalid credentials' }, 400);
        }
        return c.json({
          success: true,
          message: 'Login successful',
          data: { matricula: validatedData.data.matricula }
        }, 200);
      }
      case 'major': {
        const validatedData = loginSchemaMajor.safeParse(body);
        if (!validatedData.success) {
          return c.json({ success: false, message: 'Invalid credentials' }, 400);
        }
        return c.json({
          success: true,
          message: 'Login successful',
          data: { email: validatedData.data.email }
        }, 200);
      }
      default:
        return c.json({ success: false, message: 'Invalid type' }, 400);
    }
  } catch (error) {
    return c.json({ success: false, message: 'Invalid credentials' }, 400);
  }
}
