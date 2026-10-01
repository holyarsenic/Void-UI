import { useState} from "react";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";

interface EditProjectPageProps {
  cancelButton: () => void;
  id: number;
  projectName: string;
  projectDescription?: string;
  onUpdate: (project: { name: string; description?: string }) => void;
}

const EditProjectPage = ({ cancelButton, id, projectName, projectDescription, onUpdate }: EditProjectPageProps) => {
  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState(projectDescription || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Project name cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description?.trim(),
        }),
      });

      const projectData = await res.json();

      if (!res.ok) {
        toast.error(projectData.error || "Failed to update project");
        return;
      }

      toast.success("Project updated successfully");
      onUpdate({ name: name.trim(), description: description?.trim() });
      cancelButton();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4 border rounded-lg bg-background shadow-sm">
      <h2 className="text-xl font-theme text-foreground/80">Edit Project</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-theme text-foreground/80">
          Project Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground transition-all ease-in-out duration-300 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-theme text-foreground/80">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          rows={4}
          maxLength={200}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground transition-all ease-in-out duration-300 text-sm resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={cancelButton}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-foreground/80 bg-background/30 hover:bg-background/50 rounded-md disabled:opacity-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 w-35 flex items-center justify-center text-sm font-medium text-white bg-yellow-600/90 hover:bg-yellow-700 cursor-pointer rounded-md disabled:opacity-50 transition-all ease-in-out duration-150">
          {isSubmitting ? <HashLoader size={20} color="#fff" /> : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditProjectPage;