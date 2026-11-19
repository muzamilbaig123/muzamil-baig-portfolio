import { api } from "./client";
import type {
  ApiExperience,
  ApiMessage,
  ApiProject,
  ApiSkill,
  ExperienceInput,
  ProjectInput,
  SkillInput,
} from "./types";

type LoginResponse = { token: string; admin: { id: number; username: string } };

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    username,
    password,
  });
  return data;
}

function crud<Item, Input>(path: string) {
  return {
    list: async () => (await api.get<Item[]>(path)).data,
    create: async (input: Input) => (await api.post<Item>(path, input)).data,
    update: async (id: number, input: Input) =>
      (await api.put<Item>(`${path}/${id}`, input)).data,
    remove: async (id: number) => {
      await api.delete(`${path}/${id}`);
    },
  };
}

export type CrudApi<Item, Input> = ReturnType<typeof crud<Item, Input>>;

export const projectsApi = crud<ApiProject, ProjectInput>("/projects");
export const skillsApi = crud<ApiSkill, SkillInput>("/skills");
export const experienceApi = crud<ApiExperience, ExperienceInput>(
  "/experience",
);

// Messages: sirf dekhna aur delete (admin message create nahi karta)
export const messagesApi = {
  list: async () => (await api.get<ApiMessage[]>("/messages")).data,
  remove: async (id: number) => {
    await api.delete(`/messages/${id}`);
  },
};
