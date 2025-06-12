import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import blogService from "../services/blogs";

// Mock the blogs service
vi.mock("../services/blogs");

test("renders hidden details correctly", () => {
  const blog = {
    title: "test blog",
    url: "test.cz",
    likes: 20,
    author: "test author",
    id: "12345",
  };

  render(<Blog blog={blog} />);

  // Check if title and author are visible
  const element = screen.getByText("test blog test author", { exact: false });
  expect(element).toBeDefined();

  // Check that URL and likes are not initially visible
  expect(screen.queryByText("test.cz")).toBeNull();
  expect(screen.queryByText("20")).toBeNull();
});

test("renders details displayed correctly", async () => {
  const blog = {
    title: "test blog",
    url: "test.cz",
    likes: 20,
    author: "test author",
    id: "12345",
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  // Check if title and author are visible
  let element = screen.getByText("test blog", { exact: false });
  expect(element).toBeDefined();

  element = screen.getByText("test author", { exact: false });
  expect(element).toBeDefined();

  element = screen.getByText("test.cz", { exact: false });
  expect(element).toBeDefined();

  element = screen.getByText("20", { exact: false });
  expect(element).toBeDefined();
});

test("checks that event handler is called after clicking button", async () => {
  const blog = {
    title: "test blog",
    url: "test.cz",
    likes: 20,
    author: "test author",
    id: "12345",
  };

  const blogs = [blog];
  const mockHandler = vi.fn();

  // Mock the update function to return updated blog
  blogService.update.mockResolvedValue({ ...blog, likes: blog.likes + 1 });

  render(<Blog blog={blog} blogs={blogs} setBlogs={mockHandler} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  // Verify the mock handler was called twice
  expect(mockHandler.mock.calls).toHaveLength(2);

  // Verify the blogService.update was called twice
  expect(blogService.update.mock.calls).toHaveLength(2);
});

test("like button increases likes correctly", async () => {
  const blog = {
    title: "test blog",
    url: "test.cz",
    likes: 20,
    author: "test author",
    id: "12345",
  };

  const blogs = [blog];
  const mockSetBlogs = vi.fn();

  // Mock the update function to return updated blog
  blogService.update.mockResolvedValue({ ...blog, likes: blog.likes + 1 });

  render(<Blog blog={blog} blogs={blogs} setBlogs={mockSetBlogs} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);

  // Check that the service was called with the right arguments
  expect(blogService.update.mock.calls[0][0]).toEqual({
    ...blog,
    likes: blog.likes + 1,
  });

  // Check that setBlogs was called with updated blogs array
  const updatedBlog = { ...blog, likes: blog.likes + 1 };
  expect(mockSetBlogs.mock.calls[0][0]).toEqual([updatedBlog]);
});
